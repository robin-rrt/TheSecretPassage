import React, { Component } from 'react';
import NFT from '../../components/nft/nft';
import Artists from '../../components/artists/artists';
import { Modal, Button, Form } from 'react-bootstrap';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nfts: [],
            show: true,
            nickname: '',
            avatar: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        var nft_data = await this.props.api.getNFTs();
        this.setState({ nfts: nft_data });
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    handleFileChange = (e) => {
        this.setState({ avatar: e.target.files[0] });
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const image = await this.props.ipfs.add(this.state.avatar, {
            progress: (prog) => console.log(prog),
        });
        const imageCID = image.path;

        this.setState({ show: false });

        alert(this.state.nickname);
    }

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Welcome! Create an account first.</Modal.Title>   
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="nickname">
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control name="nickname" value={this.state.nickname} type="text" max="50" required onChange={this.handleChange} />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="avatar">
                                <Form.Label>Avatar image</Form.Label>
                                <Form.File name="avatar" type="file" accept="image/*" required onChange={this.handleFileChange} />
                            </Form.Group>
                            <br />
                            <Button variant="primary" type="submit">
                                Send
                            </Button>{' '}
                            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <main id="main">
                    <section className="section site-portfolio">
                        <div className="container">
                            <div className="row mb-5 align-items-center">
                                <div className="col-md-12 col-lg-6 mb-4 mb-lg-0" data-aos="fade-up">
                                    <h2>Freshly Minted NFTs</h2>
                                </div>
                                <div className="col-md-12 col-lg-6 text-start text-lg-end" data-aos="fade-up" data-aos-delay="100">
                                    <div id="filters" className="filters">
                                        <a href="#" data-filter="*" className="active">All</a>
                                        <a href="#" data-filter=".artwork">Artwork</a>
                                        <a href="#" data-filter=".images">Images</a>
                                        <a href="#" data-filter=".collectibles">Collectibles</a>
                                        <a href="#" data-filter=".media">Media</a>
                                    </div>
                                </div>
                            </div>
                            <div id="portfolio-grid" className="row no-gutter" data-aos="fade-up" data-aos-delay="200">

                            {
                            this.state.nfts &&
                            this.state.nfts
                                .filter(nft => nft.author !== this.props.address.base16)
                                .map((nft) => <NFT key={nft.tokenId} param={nft} />
                            )}

                            </div>
                        </div>
                    </section>

                    <section className="section services">
                        <div className="container">
                            <div className="row justify-content-center text-center mb-4">
                                <div className="col-5">
                                    <h3 className="h3 heading">NFTs, never heard of it!</h3>
                                    <p>Find out what all these things are about</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <i className="bi bi-award"></i>
                                    <h4 className="h4 mb-2">Unique</h4>
                                    <p>They are non-fungible, a single piece only can exists.</p>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <i className="bi bi-globe2"></i>
                                    <h4 className="h4 mb-2">Distributed</h4>
                                    <p>They live on the blockchain and can be accessed by anyone.</p>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <i className="bi bi-easel"></i>
                                    <h4 className="h4 mb-2">Multimedia</h4>
                                    <p>They can include any type of digital or physical art.</p>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <i className="bi bi-link-45deg"></i>
                                    <h4 className="h4 mb-2">Verified</h4>
                                    <p>The ownership and authenticity are mathematically verifiable.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Artists />
                
                </main>
            </>
        );
    }
}
