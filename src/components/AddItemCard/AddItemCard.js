import { Box, Button, Col, Row, Text } from '@qonsoll/react-design'

import Hover from 'components/AddItemCard/AddItemCard.styled'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'

const AddItemCard = (props) => {
  const { cardWidth = [12, 6, 4] } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  return (
    <Col pb="32px" v="center" cw={cardWidth} display="flex">
      <Hover>
        <Box
          display="flex"
          v="center"
          h="center"
          justifyContent="center"
          alignItems="center"
          height="100%"
          onClick={props?.onClickAction}
          cursor="pointer"
          borderRadius="10px"
          border="1px dashed var(--ql-color-dark-t-lighten3)"
        >
          <Row v="center">
            <Col v="center" h="center">
              <Button
                type="link"
                onClick={props?.onClickAction}
                icon={<PlusOutlined />}
              />
              <Text variant="body1">{t(props?.message || 'Add')}</Text>
            </Col>
          </Row>
        </Box>
      </Hover>
    </Col>
  )
}

AddItemCard.propTypes = {
  message: PropTypes.string,
  onClickAction: PropTypes.func,
  cardWidth: PropTypes.array
}

export default AddItemCard
