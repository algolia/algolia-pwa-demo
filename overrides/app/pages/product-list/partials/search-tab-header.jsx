import {useHits, useInstantSearch} from 'react-instantsearch'
import {Box, Fade} from '@salesforce/retail-react-app/app/components/shared/ui'
import React from 'react'
import {useIntl} from 'react-intl'
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'

const SearchTabHeader = ({isLoading, contentHitsCount}) => {
    const intl = useIntl()
    const {results} = useHits()
    const {status} = useInstantSearch()
    const isReady = !isLoading && ['stalled', 'idle'].includes(status)

    return (
        <TabList>
            <Tab>
                Products{' '}
                <Box sx={{marginLeft: 1}}>
                    {isReady && <Fade in={true}>({intl.formatNumber(results.nbHits)})</Fade>}
                </Box>
            </Tab>
            <Tab>Articles ({contentHitsCount})</Tab>
        </TabList>
    )
}

export default SearchTabHeader
