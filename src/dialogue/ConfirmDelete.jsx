import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function ConfirmDelete({open,handleclose,deletehandler}) {
  return (
    <Dialog open={open} onClose={handleclose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this chat?
                </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleclose}>No</Button>
            <Button color='error'  onClick={deletehandler}> Yes</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDelete