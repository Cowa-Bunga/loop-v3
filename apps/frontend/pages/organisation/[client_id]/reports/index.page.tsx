/* eslint-disable @next/next/no-img-element */
import { Box, Card } from '@mui/material'
import { LayoutBase } from '@components'
import { useSession } from '@hooks'

// @see: https://developers.looker.com/embed/getting-started/private
const Reports = () => {
  const { data: session } = useSession()
  console.warn('session', session)

  return (
    <LayoutBase>
      <Box>Reports - see google reports for additional embeds</Box>
      <Box>
        <Card>
          <img
            alt="logo"
            style={{ height: '100px' }}
            src={session?.user?.logoUrl}
          />
        </Card>
      </Box>
    </LayoutBase>
  )
}

export default Reports