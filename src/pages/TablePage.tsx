import IdHintChip from '@/components/IdHintChip'
import LanguageSwitcher from '@/components/LanguageSwitcher'
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
  Paper,
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
  A001: { id: 'A001', name: 'ノートパソコン', unitPrice: 100000 },
  A002: { id: 'A002', name: 'スマートフォン', unitPrice: 80000 },
  A003: { id: 'A003', name: 'プリンター', unitPrice: 15000 },
  A004: { id: 'A004', name: 'デスクチェア', unitPrice: 12000 },
  A005: { id: 'A005', name: 'コーヒーメーカー', unitPrice: 5000 },
  A006: { id: 'A006', name: 'ヘッドフォン', unitPrice: 7000 },
  A007: { id: 'A007', name: 'ボールペン', unitPrice: 100 },
  A008: { id: 'A008', name: 'ノート', unitPrice: 200 },
  A009: { id: 'A009', name: 'モニター', unitPrice: 30000 },
  A010: { id: 'A010', name: 'キーボード', unitPrice: 5000 },
}
const itemOptions = Object.keys(items)

function TablePage() {
  const { t } = useTranslation()
  const user = useAuthRedirect()
  const navigate = useNavigate()

  // 品番
  const [inputItemId, setInputItemId] = useState('')
  // 品名 (品番 -> 自動入力)
  const itemName = useMemo(() => {
    return items[inputItemId]?.name || t('品番を入力してください')
  }, [inputItemId, t])
  // 単価 (品番 -> 自動入力)
  const unitPrice = useMemo(() => {
    return items[inputItemId]?.unitPrice || 0
  }, [inputItemId])
  // 数量
  const [quantity, setQuantity] = useState<number | string>('');
  // 金額
  const sumAmount = useMemo(() => unitPrice * Number(quantity), [unitPrice, quantity])

  // Dialog を開く
  const [openDialog, setOpenDialog] = useState(false)

  const [tableData, setTableData] = useState<{ id: string, name: string, quantity: number | string, unitPrice: number, sumAmount: number }[]>([])

  // 表にデータを追加 -> フォームをクリア
  const handleAddData = () => {
    if (!inputItemId || !itemName || Number(quantity) <= 0 || unitPrice <= 0) {
      alert(t('すべての値を正しく入力してください'))
      return
    }

    const testLength = 1
    const newDataArray = Array.from({ length: testLength }, () => ({
      id: inputItemId,
      name: itemName,
      quantity,
      unitPrice,
      sumAmount,
    }))
    setTableData((prevData) => [...prevData, ...newDataArray])
    setInputItemId('')
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Typography variant="h6" component="div">
              {t('入力フォーム')}
            </Typography>
            <IdHintChip itemIds={itemOptions} />
          </Box>
          <FormControl
            fullWidth
            sx={{
              gap: 2,
            }}
          >
            <TextField
              label={t('品番')}
              variant="outlined"
              value={inputItemId}
              onChange={(e) => setInputItemId(e.target.value)}
              fullWidth
            />
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
              // 入力しやすいように、フォーカス時に 0 を消す。
              onFocus={() => {
                if (quantity === 0) setQuantity('');
              }}
              onChange={(e) => {
                const value = e.target.value;
                setQuantity(value === '' ? '' : Number(value));
              }}
              // フォーカスが外れた時に、空の場合は 0 を入れる。
              onBlur={() => {
                if (quantity === '') setQuantity(0);
              }}
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

      {/* 言語スイッチ */}
      <LanguageSwitcher />
    </Box>
  )
}

export default TablePage
