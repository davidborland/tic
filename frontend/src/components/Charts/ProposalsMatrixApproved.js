import React from 'react'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'

const styles = theme => ({
    root: { },
    headCell: {
        height: '100px',
        verticalAlign: 'bottom',
        fontSize: '80%',
    },
    headCellText: {
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        textAlign: 'left',
    },
    bodyRow: {
        transition: 'background-color 250ms',
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
            '& $bodyCellFilled': {
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                }
            }
        }
    },
    bodyCell: {
        padding: theme.spacing.unit,
        backgroundColor: 'transparent',
    },
    bodyCellFilled: {
        backgroundColor: theme.palette.primary.light,
        transition: 'background-color 250ms',
    },
})

const proposalsMatrix = (props) => {
    const { classes, proposals, services } = props
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell padding="dense">&nbsp;</TableCell>
                    {
                        services.map(service => (
                            <TableCell className={ classes.headCell } key={ service.index } padding="dense">
                                <div className={ classes.headCellText }>
                                    { service.description }
                                </div>
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    proposals.map(proposal => {
                        return (
                            <TableRow key={ proposal.proposal_id } className={ classes.bodyRow }>
                                <TableCell padding="dense">
                                    <div>{ proposal.proposal_id }</div>
                                </TableCell>
                                {
                                    services.map(service => {
                                        return (proposal.services_approved.indexOf(service.id) >= 0)
                                        ? <Tooltip title={
                                                <div style={{ textAlign: 'center' }}>
                                                    <div><strong>Proposal { proposal.proposal_id }</strong></div>
                                                    <div>{ service.description }</div>
                                                    <div>{ proposal.meeting_date }</div>
                                                </div>
                                            } key={ `${ proposal.id }-${ service.id }-tooltip` } placement="top">
                                            <TableCell padding="dense" className={ classnames(classes.bodyCell, classes.bodyCellFilled) }/>
                                        </Tooltip>
                                        : <TableCell key={ `${ proposal.id }-${ service.id }` } padding="dense" className={ classes.bodyCell }/>
                                    })
                                }
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export default withStyles(styles)(proposalsMatrix)