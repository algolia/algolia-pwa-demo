import React from 'react'
import {intersperse} from '../utils'

import {ChevronRightIcon} from './Icons'

/**
 * Represents the props for the Breadcrumb component.
 *
 * @typedef {Object} BreadcrumbProps
 * @property {React.JSX.Element[]} items - The breadcrumb items.
 */
type BreadcrumbProps = {
    items: React.JSX.Element[]
}

/**
 * Breadcrumb component. It renders a breadcrumb with items separated by a ChevronRightIcon.
 *
 * @param {BreadcrumbProps} props - The props for the Breadcrumb component.
 * @param {React.JSX.Element[]} props.items - The breadcrumb items.
 * @returns {JSX.Element} The Breadcrumb component.
 */
export function Breadcrumb({items}: BreadcrumbProps) {
    return (
        <div className="aa-Breadcrumb">
            {intersperse(
                items,
                <div className="aa-ItemIcon aa-ItemIcon--noBorder aa-FavoriteIcon">
                    <ChevronRightIcon />
                </div>
            )}
        </div>
    )
}
