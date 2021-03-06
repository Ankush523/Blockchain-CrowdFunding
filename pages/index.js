import React, { Component } from 'react';
import factory from '../Ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

    static async getInitialProps() {
        // next js execute on the server side
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Fund Pool</a>
                    </Link>
                ),
                fluid: true,
                style: { overflowWrap: 'break-word' }
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h1 align="center" > CrowdChain <br/><label>The blockchain based Crowd Funding Platform</label> </h1>
                <hr></hr>
                <hr></hr>
                <div>
                    <h3 align="center" >Fund Pools open for Contributing</h3>

                    <Link route="/campaigns/new">
                        <a>
                            <Button
                                content="Create New Fund"
                                icon="add circle"
                                primary
                                floated="right"
                            />
                        </a>
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;