import BreakdownChart from '@/components/Dashboard/BreakdownChart';
import Header from '@/components/Dashboard/Header';
import { Box } from '@mui/material'

type Props = {}

const Breakdown = (props: Props) => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart isDashboard={false} />
      </Box>
    </Box>
  )
}

export default Breakdown