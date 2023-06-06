import { Card, Container } from '@mui/material'
import { LayoutBase } from '@components'

// @see: https://developers.looker.com/embed/getting-started/private
// @desc: WIP / Demo trial
const Reports = () => {
  return (
    <LayoutBase>
      <Container maxWidth="xl">
        <Card>
          <iframe
            style={{ border: 0 }}
            width="100%"
            height="1260"
            src="https://lookerstudio.google.com/embed/reporting/ffc1a590-b687-42ff-a8d3-63ee55c82c88/page/XIKKC"
          ></iframe>
        </Card>
      </Container>
    </LayoutBase>
  )
}

export default Reports
