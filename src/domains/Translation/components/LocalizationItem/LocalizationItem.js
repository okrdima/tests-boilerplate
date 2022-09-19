import { Col, Row } from '@qonsoll/react-design'
import { Input, Tooltip, notification } from 'antd'

import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import { assembleTranslationLanguages } from '../../helpers'
import firebase from 'firebase/compat/app'
import md5 from 'md5'
import { useCreateTranslation } from '../../hooks'
import { useState } from 'react'
import { useTranslations } from '../../../../contexts/Translation'

const LocalizationItem = (props) => {
  // Props destructuring
  const {
    data = {},
    appName,
    enPlaceholder = '',
    noPlaceholder = '',
    withTooltips = false,
    creationEnabled = false,
    triggerTranslationsRefetch
  } = props

  // Hooks
  const { t, saveTranslationForLanguage } = useTranslations()
  const { createAllTranslations } = useCreateTranslation()

  // Data destructuring
  const { original, en, no } = data

  // States
  const [enLabel, setEnLabel] = useState(en)
  const [noLabel, setNoLabel] = useState(no)

  // Functions
  const save = (lang, value) => {
    /**
     * It shows a success notification, clears the inputs if the creation is enabled, and triggers the
     * translations data source update
     */
    const handleSuccessOperation = () => {
      // showing success in-app notification
      notification.success({
        message: t('Success'),
        description: `"${value}" ${t('label was saved to the')} ${appName}`
      })

      if (creationEnabled) {
        // clearing inputs from old values
        setNoLabel('')
        setEnLabel('')
      }

      // triggering of translations data source update
      triggerTranslationsRefetch?.()
    }
    /**
     * It takes an error object as an argument, logs the error to the console, and shows an error
     * notification to the user
     * @param error - The error object returned by the API
     */
    const handleError = (error) => {
      // showing error in-app notification
      notification.error({
        message: t('Error'),
        description: `${t('error')}`
      })
    }

    if (creationEnabled) {
      // create operation
      createAllTranslations?.({
        languages: assembleTranslationLanguages({
          enLabel,
          noLabel
        }),
        refEnding: md5(enLabel)
      })
        .then(handleSuccessOperation)
        .catch(handleError)
    } else {
      const updateTranslation = ({ textLabel, shortCode, refEnding }) => {
        /* Creating a reference to the database. */
        const ref = `translations/${appName}/${shortCode}/${refEnding}`
        return firebase.database().ref(ref).set(textLabel)
      }
      const update = saveTranslationForLanguage || updateTranslation

      // update operation
      update({
        textLabel: value,
        refEnding: original,
        shortCode: lang
      })
        .then(handleSuccessOperation)
        .catch(handleError)
    }
  }

  // Template
  return (
    <Row mb={2} noOuterGutters>
      <Col>
        <Input
          value={enLabel}
          placeholder={enPlaceholder}
          onChange={(e) => setEnLabel(e.target.value)}
          onPressEnter={() => save('en', enLabel)}
          suffix={
            withTooltips ? (
              <Tooltip
                title={t(
                  'You can add new translation by filling this input and pressing "Enter"'
                )}>
                <Icon
                  name="AlertCircleFilled"
                  cursor="help"
                  fill="var(--ql-color-accent1)"
                />
              </Tooltip>
            ) : null
          }
        />
      </Col>
      <Col>
        <Input
          value={noLabel}
          placeholder={noPlaceholder}
          onChange={(e) => setNoLabel(e.target.value)}
          onPressEnter={() => save('no', noLabel)}
          suffix={
            withTooltips ? (
              <Tooltip
                title={t(
                  'You can add new translation by filling this input and pressing "Enter"'
                )}>
                <Icon
                  name="AlertCircleFilled"
                  cursor="help"
                  fill="var(--ql-color-accent1)"
                />
              </Tooltip>
            ) : null
          }
        />
      </Col>
    </Row>
  )
}

LocalizationItem.propTypes = {
  data: PropTypes.object,
  appName: PropTypes.string.isRequired,
  enPlaceholder: PropTypes.string,
  noPlaceholder: PropTypes.string,
  withTooltips: PropTypes.bool,
  creationEnabled: PropTypes.bool,
  triggerTranslationsRefetch: PropTypes.func
}

export default LocalizationItem
