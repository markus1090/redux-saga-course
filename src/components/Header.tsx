import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { currentUserSelector, removeCurrentUser } from '../features/currentUserSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(currentUserSelector);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Facebook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='text-decoration-none text-black' to={'/dashboard/posts'}>
                            Posts
                        </Link>
                    </Nav>
                    <Navbar.Text>
                        Signed in as: <Link to={'/dashboard/profile'}>{currentUser?.name || ''}</Link>
                    </Navbar.Text>
                    <Nav className='ms-lg-3'>
                        <Navbar.Text onClick={() => dispatch(removeCurrentUser())}>
                            Logout
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header