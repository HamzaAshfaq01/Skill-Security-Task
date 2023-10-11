import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
	  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
	  borderRadius: 5,
	  backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
	},
  }));


function Row(props: { row: any }) {
	const { row } = props
	const [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<TableRow  sx={{ width:100}}>
				<TableCell >
					<IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component='th' scope='row' >
					<p className={`${row.severity == "low" && "bg-blue-600"} ${row.severity == "high" && "bg-orange-600"} ${row.severity == "medium" && "bg-yellow-500"} ${row.severity == "critical" && "bg-red-600"} text-center rounded-md capitalize px-3 py-1 text-white font-bold`}>
					{row.severity}
					</p>
				</TableCell>
				<TableCell align='left'>{row.grouped_finding_created}</TableCell>
				<TableCell align='left'>{row.sla}</TableCell>
				<TableCell align='left'>{row.description}</TableCell>
				<TableCell align='left'>
					<div className="flex item-center justify-center space-x-2">
					<Avatar sx={{width:24,height:24,marginRight:2,bgcolor: "blue"}} >{row.security_analyst[0]}</Avatar>{row.security_analyst}
					</div>
					</TableCell>
				<TableCell align='left'>
				<div className="flex item-center justify-center space-x-2">
					<Avatar sx={{width:24,height:24,marginRight:2,bgcolor: "orange"}} >{row.owner[0]}</Avatar>
					{row.owner}
					</div>
					</TableCell>
				<TableCell align='left'>{row.workflow}</TableCell>
				<TableCell align='left'>{row.progress &&  (<>
					<p className={` text-center rounded-md capitalize px-3 py-1  bg-blue-500 text-white font-bold mb-1`}>{row.status} </p>
				<BorderLinearProgress variant="determinate" value={Math.round(row.progress)} /></>)	}
				
				
				</TableCell>
				<TableCell align='left'>  </TableCell>
				<TableCell align='left'>  </TableCell>
				<TableCell align='left'>  </TableCell>
			</TableRow>
			<TableRow sx={{ width:100}}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
					<Collapse className='py-5 px-5 pb-10' in={open} timeout='auto'  unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant='h6' gutterBottom component='div'>
							<span className="font-extrabold">
							Row Findings
				</span>
							
							</Typography>
							<Table size='small' aria-label='purchases'>
								<TableHead>
									<TableRow>
										<TableCell>SEVERITY</TableCell>
										<TableCell>TIME</TableCell>
										<TableCell align='left'>SOURCE</TableCell>
										<TableCell align='left'>DESCRIPTION</TableCell>
										<TableCell align='left'>ASSET</TableCell>
										<TableCell align='left'>STATUS</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{JSON.parse(row.raw_findings)?.map((raw_finding: any, index: number) => (
										<TableRow key={index}>
											<TableCell component='th' scope='row'>
											<p className={`${row.severity == "low" && "bg-blue-600"} ${row.severity == "high" && "bg-orange-600"} ${row.severity == "medium" && "bg-yellow-500"} ${row.severity == "critical" && "bg-red-600"} text-center rounded-md capitalize px-3 py-1 text-white font-bold`}>

												{raw_finding.severity}
												</p>
											</TableCell>
											<TableCell>{raw_finding.time}</TableCell>
											<TableCell align='left'>
												<div className="flex item-center justify-center ">
											<Avatar src="/security-icon.jpeg"  sx={{width:24,height:24,marginRight:2,}} />
												{raw_finding.source}
												</div>
												</TableCell>
											<TableCell align='left'>{raw_finding.description}</TableCell>
											<TableCell align='left'>{raw_finding.asset}</TableCell>
											<TableCell align='left'>
											<p className={`${raw_finding.status == "open" && "bg-blue-600"} ${raw_finding.status == "fixed" && "bg-orange-600"} ${raw_finding.status == "in_progress" && "bg-green-500"}  text-center rounded-md capitalize px-3 py-1 text-white font-bold`}>

											{raw_finding.status}
</p>
												</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

function CollapsibleTable({ records }: any) {
	return (
		<>
			<Typography variant='h6' className="p-5"  gutterBottom component='div'>
				<span className="p-5 font-extrabold">
				Grouped Findings
				</span>
			</Typography>
			<TableContainer component={Paper}>
				<Table aria-label='collapsible table'>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell align='center' >SEVERITY</TableCell>
							<TableCell align='left'>TIME</TableCell>
							<TableCell align='left'>SLA&nbsp;(g)</TableCell>
							<TableCell align='left'>DESCRIPTION&nbsp;(g)</TableCell>
							<TableCell align='left'>SECURITY ANALYST&nbsp;(g)</TableCell>
							<TableCell align='left'>OWNER &nbsp;(g)</TableCell>
							<TableCell align='left'>WORKFLOW &nbsp;(g)</TableCell>
							<TableCell align='left'>STATUS &nbsp;(g)</TableCell>
							<TableCell align='left'>OF FINDINGS &nbsp;(g)</TableCell>
							<TableCell align='left'>COMMUNICATION &nbsp;(g)</TableCell>
							<TableCell align='left'>ACTION &nbsp;(g)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{records?.map((record: any) => (
							<Row key={record.id} row={record} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default CollapsibleTable
