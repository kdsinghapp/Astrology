import React, { Fragment, Component } from 'react'
import Header from "../Common/Header/Header"
import Footer from "../Common/Footer/Footer"
import HeaderBottom from './HeaderBottom'


const HOC = (Wcomponent) => {
    return class extends Component {
        render() {
            return (
                <Fragment>
                    <div className='app-container-hoc main-margin'>
                        <Header />
                        <HeaderBottom />
                        <div>
                            <Wcomponent {...this.props} />
                        </div>
                        <Footer />
                    </div>
                </Fragment>
            )
        }
    }
}

export default HOC