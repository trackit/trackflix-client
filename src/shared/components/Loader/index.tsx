import React from 'react'
import CSS from 'csstype'
import Loader from 'react-loader-spinner'

type LoaderSpinnerProps = {
    type?:
        | 'Audio'
        | 'BallTriangle'
        | 'Bars'
        | 'Circles'
        | 'Grid'
        | 'Hearts'
        | 'Oval'
        | 'Puff'
        | 'Rings'
        | 'TailSpin'
        | 'ThreeDots'
        | 'Watch'
        | 'RevolvingDot'
        | 'Triangle'
        | 'Plane'
        | 'MutatingDots'
        | 'CradleLoader'
    color?: string
    height?: number
    width?: number
    timeout?: number
}

type BasicLoaderProps = {
    style?: CSS.Properties
    loader?: LoaderSpinnerProps
}

const BasicLoader = ({ style, loader }: BasicLoaderProps) => {
    const defaultStyle: CSS.Properties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
    }

    const containerStyle = style || defaultStyle

    return (
        <div style={{ ...containerStyle, zIndex: 4 }}>
            <Loader
                type={loader?.type || 'Bars'}
                color={loader?.color || 'var(--trackflix-primary-color)'}
                height={loader?.height || 100}
                width={loader?.width || 100}
                timeout={loader?.timeout || 30000}
            />
        </div>
    )
}

export default BasicLoader
