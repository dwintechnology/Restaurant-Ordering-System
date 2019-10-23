import React, { Component } from 'react';
// import MainSection from './MainSection';
import InfoSectionModal from './Modals/InfoSectionModal';
import MainSection from './MainSection';
import { connect } from 'react-redux';
// import InfoSection from './Common/InfoSection';

class Home extends Component {
    render() {
        return (
            <div>
                {!this.props.ordering_type && <InfoSectionModal />}
                <MainSection />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ordering_time: state.deliveryOptionsReducer.ordering_time,
        restaurant: state.deliveryOptionsReducer.restaurant,
        ordering_type:  state.deliveryOptionsReducer.ordering_type
    };
}

export default connect(mapStateToProps, {})(Home);

