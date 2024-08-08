import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Text,
    Divider,
    SimpleGrid,
    useMultiStyleConfig,
    Select as ChakraSelect,
    createStylesContext,
    FormControl
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {useIntl} from 'react-intl'

import {HideOnDesktop, HideOnMobile} from '@salesforce/retail-react-app/app/components/responsive'
import {getPathWithLocale} from '@salesforce/retail-react-app/app/utils/url'
import LocaleText from '@salesforce/retail-react-app/app/components/locale-text'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'
import styled from '@emotion/styled'
import {trackEvent} from '../algolia/homepage/segmentTracker'

const [StylesProvider] = createStylesContext('Footer')

const FooterHeading = styled(Text)`
    font-weight: bold;
    margin-bottom: 16px;
`

const FooterLink = styled.a`
    display: block;
    margin-bottom: 8px;
    color: inherit;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`

const Footer = ({...otherProps}) => {
    const handleClick = (eventTitle) => {
        trackEvent('Footer: ' + eventTitle)
    }
    const styles = useMultiStyleConfig('Footer')
    const intl = useIntl()
    const [locale, setLocale] = useState(intl.locale)
    const {site, buildUrl} = useMultiSite()
    const {l10n} = site
    const supportedLocaleIds = l10n?.supportedLocales.map((locale) => locale.id)
    const showLocaleSelector = supportedLocaleIds?.length > 1

    const Select = styled(ChakraSelect)({
        option: styles.localeDropdownOption
    })

    return (
        <Box as="footer" {...styles.container} {...otherProps}>
            <Box {...styles.content}>
                <StylesProvider value={styles}>
                    <HideOnMobile>
                        <SimpleGrid columns={3} spacing={3}>
                            <Box>
                                <FooterHeading>Find out more</FooterHeading>
                                <FooterLink
                                    href="https://www.algolia.com/about/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleClick('About Algolia')}
                                >
                                    About Algolia
                                </FooterLink>
                                <FooterLink
                                    href="https://algolia.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleClick('Algolia Website')}
                                >
                                    Algolia Website
                                </FooterLink>
                            </Box>
                            <Box>
                                <FooterHeading>Try it out</FooterHeading>
                                <FooterLink
                                    href="https://www.algolia.com/doc/integration/salesforce-commerce-cloud-b2c/getting-started/introduction/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleClick('Explore the cartridge')}
                                >
                                    Explore the cartridge
                                </FooterLink>
                                <FooterLink
                                    href="https://dashboard.algolia.com/users/sign_up"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleClick('Sign up')}
                                >
                                    {intl.formatMessage({
                                        id: 'footer.link.signin_create_account',
                                        defaultMessage: 'Sign in or create account'
                                    })}
                                </FooterLink>
                            </Box>
                            <Box>
                                <FooterHeading>Contact us</FooterHeading>
                                <FooterLink
                                    href="https://www.algolia.com/demorequest/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleClick('Demo Request')}
                                >
                                    Request custom demo
                                </FooterLink>
                                <FooterLink
                                    href="https://support.algolia.com/hc/en-us"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleClick('Get support')}
                                >
                                    Get support
                                </FooterLink>
                            </Box>
                        </SimpleGrid>
                    </HideOnMobile>
                    {showLocaleSelector && (
                        <Box {...styles.localeSelector}>
                            <FormControl
                                data-testid="sf-footer-locale-selector"
                                id="locale_selector"
                                width="auto"
                                {...otherProps}
                            >
                                <Select
                                    defaultValue={locale}
                                    onChange={({target}) => {
                                        setLocale(target.value)
                                        const newUrl = getPathWithLocale(target.value, buildUrl, {
                                            disallowParams: ['refine']
                                        })
                                        window.location = newUrl
                                    }}
                                    variant="filled"
                                    {...styles.localeDropdown}
                                >
                                    {supportedLocaleIds.map((locale) => (
                                        <option key={locale} value={locale}>
                                            <LocaleText shortCode={locale} />
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )}

                    <Divider {...styles.horizontalRule} />

                    <Box {...styles.bottomHalf}>
                        <Text {...styles.copyright}>
                            &copy; {new Date().getFullYear()}
                            {' ' +
                                'Algolia. All rights reserved. This is a demo store only. Orders made WILL NOT be processed.'}
                        </Text>

                        <HideOnDesktop>
                            <LegalLinks variant="vertical" />
                        </HideOnDesktop>
                        <HideOnMobile>
                            <LegalLinks variant="horizontal" />
                        </HideOnMobile>
                    </Box>
                </StylesProvider>
            </Box>
        </Box>
    )
}

export default Footer

const LegalLinks = ({variant}) => {
    const intl = useIntl()
    const styles = useMultiStyleConfig('Footer')
    return (
        <Box
            {...(variant === 'vertical' ? styles.legalLinksVertical : styles.legalLinksHorizontal)}
        >
            <button id="ot-sdk-btn" className="ot-sdk-show-settings">
                Cookie Settings
            </button>
            <FooterLink href="/" {...styles.legalLink}>
                {intl.formatMessage({
                    id: 'footer.link.terms_conditions',
                    defaultMessage: 'Terms & Conditions'
                })}
            </FooterLink>
            <FooterLink href="/" {...styles.legalLink}>
                {intl.formatMessage({
                    id: 'footer.link.privacy_policy',
                    defaultMessage: 'Privacy Policy'
                })}
            </FooterLink>
            <FooterLink href="/" {...styles.legalLink}>
                {intl.formatMessage({
                    id: 'footer.link.site_map',
                    defaultMessage: 'Site Map'
                })}
            </FooterLink>
        </Box>
    )
}

LegalLinks.propTypes = {
    variant: PropTypes.oneOf(['vertical', 'horizontal'])
}
