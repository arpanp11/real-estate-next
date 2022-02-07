import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/images/home.jpeg';

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => {
  return (
    <Link href={`/property/${externalID}`} passHref>
      <Flex
        flexWrap='wrap'
        w='420px'
        p='5'
        paddingTop='0'
        justifyContent='flex-start'
        cursor='pointer'
      >
        {/* home images */}
        <Box>
          <Image
            src={coverPhoto ? coverPhoto.url : DefaultImage}
            alt='home'
            width={400}
            height={260}
          />
        </Box>
        {/* home price details */}
        <Box w='full'>
          <Flex
            paddingTop='2'
            alignItems='center'
            justifyContent='space-between'
          >
            <Flex alignItems='center'>
              {/* verify icon */}
              <Box paddingRight='3' color='green.400'>
                {isVerified && <GoVerified />}
              </Box>
              {/* home price */}
              <Text fontWeight='bold' fontSize='lg'>
                AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
              </Text>
            </Flex>
            {/* agency logo */}
            <Box>
              <Avatar size='sm' src={agency?.logo?.url} />
            </Box>
          </Flex>
          <Flex
            alignItems='center'
            p='1'
            justifyContent='space-between'
            w='250px'
            color='blue.400'
          >
            {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{' '}
            <BsGridFill />
          </Flex>
          <Text fontSize='lg'>
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default Property;
