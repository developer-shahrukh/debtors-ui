import { Box } from '@mui/material'
import React from 'react'

function Feeds({children}) {
  return (
    <Box flex={4} p={2}>
      {children}
    </Box>
  )
}

export default Feeds