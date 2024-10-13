import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react'

type HelpIconWithDialogProps = {
  // string も OK だし、 <br /> 入りの <></> も OK
  message: React.ReactNode
  title?: string
}

const HelpIconWithDialog = ({ message, title = 'ヘルプ' }: HelpIconWithDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box
        component={Button}
        onClick={handleClickOpen}
        sx={{
          minWidth: 'auto',
          padding: 0,
          boxShadow: 1,
          '&:hover': {
            boxShadow: 2,
            backgroundColor: 'transparent',
          },
        }}
      >
        <HelpCenterIcon
          color="secondary"
          sx={{ transition: 'color 0.3s' }}
        />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default HelpIconWithDialog
