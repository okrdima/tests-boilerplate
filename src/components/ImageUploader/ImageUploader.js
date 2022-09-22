import { Button, Img } from '@qonsoll/react-design'
import { memo, useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { uploadImage } from 'helpers'
import { useTranslations } from 'contexts/Translation'

/**
 * It's a React component that renders an image uploader
 * @param value {string} - The image url
 * @param onChange {function} - The function to call when the image is changed
 * @param withDirectUpload {boolean} - If true, returns a url to the image
 */
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
      const [url] = await uploadImage(file)
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
