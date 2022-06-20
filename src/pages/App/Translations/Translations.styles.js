import { Tabs } from 'antd'
import styled from 'styled-components'

export const CustomTabs = styled(Tabs)`
  height: ${(props) => props.height || '100%'};
  & .ant-tabs-content-top {
    height: ${(props) => props.height || '100%'};
  }
`
