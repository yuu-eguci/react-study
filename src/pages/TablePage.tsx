import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const items: { [key: string]: { id: string; name: string; unitPrice: number } } = {
  A001: { id: 'A001', name: 'ノートパソコン', unitPrice: 50 },
  A002: { id: 'A002', name: 'スマートフォン', unitPrice: 15 },
  A003: { id: 'A003', name: 'プリンター', unitPrice: 10 },
  A004: { id: 'A004', name: 'デスクチェア', unitPrice: 5 },
  A005: { id: 'A005', name: 'コーヒーメーカー', unitPrice: 10 },
  A006: { id: 'A006', name: 'ヘッドフォン', unitPrice: 30 },
  A007: { id: 'A007', name: 'ボールペン', unitPrice: 49 },
  A008: { id: 'A008', name: 'ノート', unitPrice: 45 },
  A009: { id: 'A009', name: 'モニター', unitPrice: 10 },
  A010: { id: 'A010', name: 'キーボード', unitPrice: 30 },
}
const itemOptions = Object.keys(items)

function TablePage() {
  const { t } = useTranslation()
  const user = useAuthRedirect()
  const navigate = useNavigate()

  // 品番
  const [selectedItemId, setSelectedItemId] = useState('')
  // 品名 (品番 -> 自動入力)
  const itemName = useMemo(() => {
    return items[selectedItemId]?.name || t('品番を入力してください')
  }, [selectedItemId, t])
  // 単価 (品番 -> 自動入力)
  const unitPrice = useMemo(() => {
    return items[selectedItemId]?.unitPrice || 0
  }, [selectedItemId])
  // 数量
  const [quantity, setQuantity] = useState(0)
  // 金額
  const sumAmount = useMemo(() => unitPrice * quantity, [unitPrice, quantity])

  // Dialog を開く
  const [openDialog, setOpenDialog] = useState(false)

  const [tableData, setTableData] = useState<{ id: string, name: string, quantity: number, unitPrice: number, sumAmount: number }[]>([])

  // 表にデータを追加 -> フォームをクリア
  const handleAddData = () => {
    if (!selectedItemId || !itemName || quantity <= 0 || unitPrice <= 0) {
      alert(t('すべての値を正しく入力してください'))
      return
    }

    const testLength = 1
    const newDataArray = Array.from({ length: testLength }, () => ({
      id: selectedItemId,
      name: itemName,
      quantity,
      unitPrice,
      sumAmount,
    }))
    setTableData((prevData) => [...prevData, ...newDataArray])
    setSelectedItemId('')
    setQuantity(0)
  }

  const onConfirmClearData = (confirm: boolean) => {
    setOpenDialog(false)
    if (confirm && tableData.length > 0) {
      setTableData([])
    }
  }

  return (
    <Box sx={{
      width: { xs: '100%', sm: '1000px' },
      padding: 2,
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* メインメニューに戻るボタン */}
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => navigate(`/?user=${encodeURIComponent(user || '')}`)}
          sx={{ marginBottom: 2 }}
        >
          {t('戻る')}
        </Button>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            sx={{ marginBottom: 2 }}
            disabled={tableData.length === 0}
            onClick={() => {
              setOpenDialog(true)
            }}
          >
            {t('クリア')}
          </Button>

          <Dialog
            open={openDialog}
            onClose={() => onConfirmClearData(false)}
          >
            <DialogTitle>{t('確認')}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t('データをクリアしますか？')}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => onConfirmClearData(false)} color="primary">
                {t('キャンセル')}
              </Button>
              <Button onClick={() => onConfirmClearData(true)} color="secondary">
                {t('OK')}
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => {
              const newData = Object.keys(items).map((key) => {
                const item = items[key]
                return {
                  id: item.id,
                  name: item.name,
                  quantity: 1,
                  unitPrice: item.unitPrice,
                  sumAmount: item.unitPrice * 1
                }
              })

              setTableData((prevData) => [...prevData, ...newData])
            }}
            sx={{ marginBottom: 2 }}
          >
            {t('+ テストデータ')}
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        {/* 左側の入力フォーム */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" component="div">
            {t('入力フォーム')}
          </Typography>
          <FormControl
            fullWidth
            sx={{
              gap: 2,
            }}
          >
            <InputLabel id="product-select-label">{t('品番')}</InputLabel>
            <Select
              labelId="product-select-label"
              id="product-select"
              value={selectedItemId}
              label={t('品番')}
              onChange={(e: SelectChangeEvent) => setSelectedItemId(e.target.value)}
            >
              {itemOptions.map((itemId) => (
                <MenuItem key={itemId} value={itemId}>
                  {itemId} ({items[itemId].name})
                </MenuItem>
              ))}
            </Select>
            <TextField
              label={t('品名')}
              variant="filled"
              value={itemName}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <TextField
              label={t('数量')}
              type="number"
              variant="outlined"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <TextField
              label={t('単価')}
              type="number"
              variant="filled"
              value={unitPrice}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <TextField
              label={t('金額 (数量 x 単価)')}
              type="number"
              variant="filled"
              value={sumAmount}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <Button variant="contained" color="primary" onClick={handleAddData}>
              {t('データを追加')}
            </Button>
          </FormControl>
        </Box>

        {/* 右側のテーブル */}
        <Box
          sx={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: '80vh',
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {
                backgroundColor: '#FFFFFF',
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'lightgray',
                borderRadius: '4px',
              },
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>{t('品番')}</TableCell>
                  <TableCell>{t('品名')}</TableCell>
                  <TableCell>{t('数量')}</TableCell>
                  <TableCell>{t('単価 (￥)')}</TableCell>
                  <TableCell>{t('金額 (￥)')}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tableData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell align="right">{data.quantity.toLocaleString()}</TableCell>
                    <TableCell align="right">{data.unitPrice.toLocaleString()}</TableCell>
                    <TableCell align="right">{data.sumAmount.toLocaleString()}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  )
}

export default TablePage
