import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('Not Found')}</h1>

      {/* 言語スイッチ */}
      <LanguageSwitcher />
    </div>
  )
}

export default NotFoundPage
