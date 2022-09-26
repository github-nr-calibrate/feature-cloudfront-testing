{ /* <SmoothCarousel
  key={`home_slice_${slice.slice_type}_${sliceIndex}`}
  borderBottom="1px solid"
  borderColor="nightshadeFaded"
  mb="4"
  itemGap={[40, '10vw']}
  width="100vw"
  enableMouseDrag={false}
  infinite={false}
  items={slice.items.map((item, index) => (
    <Box
      key={`home_slice_${slice.slice_type}_item_${index}`}
      height="auto"
      width="200px"
      color="nightshade"
      py="2.75rem"
    >
      <Box as="img" width="70%" mx="15%" src={item.logo.url} />
      <Text typeStyle="body" textAlign="center" pt="2rem" opacity="0.5">
        {`“${RichText.asText(item.quote)}”`}
      </Text>
    </Box>
  ))}
/> */ }
