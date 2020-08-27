import React, { Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'

const Base = ({children}) => {
return(
<Fragment>
    <Header />
    {children}
    <Footer />
</Fragment>
)
}

export default Base