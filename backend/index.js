const express = require('express')
const cors = require('cors')
const sqlite = require('sqlite3').verbose()
const app = express()

app.use(cors())

const db = new sqlite.Database('findings.db', (error) => {
	if (error) {
		console.log(error)
	} else {
		console.log('DB Connected')
	}
})

const query = `
SELECT
grouped_findings.*, 
JSON_GROUP_ARRAY(JSON_OBJECT('severity', raw_findings.severity, 'time', raw_findings.finding_created, 'source', raw_findings.source_security_tool_name, 'description', raw_findings.description, 'status',  raw_findings.status, 'asset',  raw_findings.asset )) AS raw_findings
FROM grouped_findings
LEFT JOIN raw_findings ON grouped_findings.id = raw_findings.grouped_finding_id
GROUP BY grouped_findings.id;
`

app.get('/records', (req, res) => {
	try {
		// db.all('SELECT * FROM grouped_findings c INNER JOIN raw_findings c1 ON c.id = c1.grouped_finding_id', (error, rows) => {
		db.all(query, (error, rows) => {
			if (error) {
				throw error
			}
			res.status(200).json(rows)
		})
	} catch (error) {
		res.status(500).json(error)
	}
})

app.get('/recordss', (req, res) => {
	try {
		db.all('SELECT * FROM raw_findings', (error, rows) => {
			if (error) {
				throw error
			}
			res.status(200).json(rows)
		})
	} catch (error) {
		res.status(500).json(error)
	}
})

app.listen(5000, () => {
	console.log('Server is running on 5000 Port')
})
