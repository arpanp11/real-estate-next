import { useEffect, useState } from 'react';
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { MdCancel } from 'react-icons/md';

import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg';

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //   search property handler
  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    // update query
    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };

  useEffect(() => {
    if (searchText !== '') {
      const fetchLocation = async () => {
        setLoading(true);

        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchText}`
        );
        // console.log(data);
        setLoading(false);
        setLocation(data?.hits);
      };

      fetchLocation();
    }
  }, [searchText]);

  return (
    <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
      {filters?.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
            placeholder={filter.placeholder}
            w='fit-content'
            p='2'
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}

      <Flex flexDir='column'>
        <Button
          border='1px'
          borderColor='gray.200'
          marginTop='2'
          bg='blue.400'
          onClick={() => setShowLocations(!showLocations)}
        >
          Search Location
        </Button>

        {showLocations && (
          <Flex flexDir='column' pos='relative' paddingTop='2'>
            {/* input  */}
            <Input
              placeholder='Type Location Here'
              value={searchText}
              w='300px'
              focusBorderColor='gray.300'
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText !== '' && (
              <Icon
                as={MdCancel}
                pos='absolute'
                cursor='pointer'
                right='5'
                top='5'
                zIndex='100'
                onClick={() => setSearchText('')}
              />
            )}

            {/* spinner */}
            {loading && <Spinner margin='auto' marginTop='3' />}

            {showLocations && (
              <Box height='300px' overflow='auto'>
                {location?.map((l) => (
                  <Box
                    key={l.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: l.externalID,
                      });
                      setShowLocations(false);
                      setSearchText(l.name);
                    }}
                  >
                    <Text
                      cursor='pointer'
                      bg='gray.200'
                      p='2'
                      borderBottom='1px'
                      borderColor='gray.100'
                    >
                      {l.name}
                    </Text>
                  </Box>
                ))}
                {/* no location found, load noresult image here */}
                {!loading && !location?.length && (
                  <Flex
                    justifyContent='center'
                    alignItems='center'
                    flexDir='column'
                    marginTop='5'
                    marginBottom='5'
                  >
                    <Image src={noresult} alt='no result' />
                    <Text fontSize='xl' marginTop='3'>
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchFilters;
