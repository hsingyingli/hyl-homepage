import { Fragment } from "react"
import { Progress, Text } from '@chakra-ui/react';


const ChakraProgress = ({ skills }) => {
  const title = Object.keys(skills)
  return (
    <Fragment>
      {title.map((key) => {
        const color = skills[key].color
        const score = skills[key].score
        return (
          <Fragment key={key}>
            <Text pt={3} pb={1} fontSize="xl" fontWeight="500">
              {key}
            </Text>
            <Progress isAnimated={true} value={score} size="xs" colorScheme={color} />
          </Fragment>
        )
      })}
    </Fragment>

  )
}


export default ChakraProgress
