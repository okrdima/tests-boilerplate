import { Box, Button, Col, Row, Text } from '@qonsoll/react-design'

import Hover from './AddItemCard.styled'
import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import boxStyles from './boxStyles'
import { useTranslations } from 'contexts/Translation'

const AddItemCard = (props) => {
  const { height, onClickAction, message, withoutMessage = false } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  return (
    <Hover>
      <Box {...boxStyles} height={height || '100%'} onClick={onClickAction}>
        <Row v="center" noGutters>
          <Col v="center" h="center">
            <Button
              type="link"
              onClick={onClickAction}
              icon={
                <Icon name="Plus1Outlined" fill="var(--ql-icon-color-accent)" />
              }
            />
            {!withoutMessage && (
              <Text variant="body1">{message || t('Add')}</Text>
            )}
          </Col>
        </Row>
      </Box>
    </Hover>
  )
}

AddItemCard.propTypes = {
  message: PropTypes.string,
  onClickAction: PropTypes.func,
  height: PropTypes.string,
  withoutMessage: PropTypes.bool
}

export default AddItemCard
