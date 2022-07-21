import { Button, Img } from '@qonsoll/react-design'
import { memo, useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { uploadFile } from 'services/storage'
import { useTranslations } from 'contexts/Translation'

const ImageUploader = (props) => {
  const { value, onChange, withDirectUpload = false } = props

  // [COMPONENT_STATE_HOOKS]
  const [file, setFile] = useState(null)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [HANDLER_FUNCTIONS]
  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const handleUpload = async ({ onSuccess, file }) => {
    if (withDirectUpload) {
      const [url] = await uploadFile(file)
      onChange(url)
    } else {
      onChange?.(file)
      getBase64(file, (result) => setFile(result))
    }
    onSuccess()
  }

  // [LIFECYCLE]
  useEffect(() => value && setFile(value), [value])

  return (
    <Upload fileList={null} customRequest={handleUpload}>
      {file ? (
        <Img
          alt="Image"
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            cursor: 'pointer'
          }}
          src={file || value}
        />
      ) : (
        <Button icon={<UploadOutlined />}>{t('Please upload image')}</Button>
      )}
    </Upload>
  )
}

ImageUploader.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  withDirectUpload: PropTypes.bool
}

export default memo(ImageUploader)
