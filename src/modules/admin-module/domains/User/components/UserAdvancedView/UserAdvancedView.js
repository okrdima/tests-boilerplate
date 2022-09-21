import { Avatar, Box, Card, Col, Row, Text, Title } from '@qonsoll/react-design'
import { avatarStyles, boxStyles } from './UserAdvancedView.styled'
import { generatePath, useHistory } from 'react-router-dom'
import { useSimpleFormActions } from 'hooks'

import { COLLECTIONS } from '__constants__'
import { CardDropdown } from 'components'
import { Icon } from '@qonsoll/icons'
import PATHS from 'pages/paths'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'

const UserAdvancedView = (props) => {
  const { item, index, isEditable = false } = props

  const history = useHistory()
  const { handleDelete: removeDocument } = useSimpleFormActions({
    document: item,
    collectionName: COLLECTIONS.USERS
  })
  const { t } = useTranslations()

  const handleEdit = () => {
    history.push(
      generatePath(PATHS.AUTHENTICATED.USER_EDIT, {
        userId: item?._id
      })
    )
  }

  const handleDelete = async (item) => {
    try {
      removeDocument()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return (
    <CardDropdown
      position="relative"
      onDelete={isEditable && handleDelete}
      onEdit={isEditable && handleEdit}
      document={item}
      index={index}
      flex="1 0 auto">
      <Card height="100%" p={3} bodyStyle={{ padding: 0 }} minHeight="105px">
        <Row noGutters>
          <Col cw="auto">
            <Avatar
              {...avatarStyles}
              src={item?.avatarUrl}
              icon={<Icon name="User1Outlined" size={20} />}
            />
          </Col>
          <Col h="center">
            <Box {...boxStyles}>
              {item?.firstName && <Title level={4}>{item?.firstName}</Title>}
              <Text>{item?.lastName || t('No data')}</Text>
            </Box>
          </Col>
        </Row>
      </Card>
    </CardDropdown>
  )
}

UserAdvancedView.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  isEditable: PropTypes.bool
}

export default UserAdvancedView
