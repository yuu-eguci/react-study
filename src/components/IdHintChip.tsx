import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type ChipWithDialogProps = {
  itemIds: string[]
}

const IdHintChip = ({ itemIds }: ChipWithDialogProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box>
      <Chip
        label={t('ヒント：有効な品番')}
        onClick={handleOpen}
        color="secondary"
        variant="outlined"
        size="small"
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('有効な品番リスト')}</DialogTitle>
        <DialogContent>
          <List>
            {itemIds.map((id) => (
              <ListItem key={id}>
                <ListItemText primary={id} />
              </ListItem>
            ))}
          </List>
          <Button onClick={handleClose} color="primary" sx={{ marginTop: 2 }}>
            {t('閉じる')}
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default IdHintChip
