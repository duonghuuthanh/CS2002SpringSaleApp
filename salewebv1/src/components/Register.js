import { useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";

const Register = () => {
    const [user, setUser] = useState({
        "username": "",
        "password": "",
        "firstName": "",
        "lastName": "",
        "email": "",
        "phone": "",
        "confirmPass": ""
    });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const avatar = useRef();
    const nav = useNavigate();

    const change = (evt, field) => {
        setUser(current => {
            return {...current, [field]: evt.target.value};
        });
    }

    const register = (evt) => {
        evt.preventDefault();

        const process = async () => {
            let formData = new FormData();
            for (let field in user)
                formData.append(field, user[field]);

            if (avatar.current.files.length > 0)
                formData.append("avatar", avatar.current.files[0]);

            setLoading(true);
            let res = await Apis.post(endpoints['register'], formData);
            if (res.status === 201) {
                nav("/login");
            } else {
                setErr("Hệ thống đang bị lỗi!");
                setLoading(false);
            }
        }

        if (user.password !== user.confirmPass) {
            setErr("Mật khẩu KHÔNG khớp!");
        } else {
            process();
        }
    }

    return <>
        <h1 className="text-center text-info mt-2">ĐĂNG KÝ NGƯỜI DÙNG</h1>
        {err === null?"":<Alert variant="danger">{err}</Alert>}
        <Form onSubmit={register}>
            <Form.Group className="mb-3">
                <Form.Label>Tên</Form.Label>
                <Form.Control type="text" value={user.firstName} 
                              onChange={e => change(e, "firstName")} 
                              placeholder="Tên" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Họ và tên lót</Form.Label>
                <Form.Control type="text" value={user.lastName} 
                              onChange={e => change(e, "lastName")} 
                              placeholder="Họ và tên lót" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Điện thoại</Form.Label>
                <Form.Control type="tel" value={user.phone} 
                              onChange={e => change(e, "phone")} 
                              placeholder="Điện thoại" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={user.email} 
                              onChange={e => change(e, "email")} 
                              placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tên đăng nhập</Form.Label>
                <Form.Control type="text" value={user.username} 
                              onChange={e => change(e, "username")} 
                              placeholder="Tên đăng nhập" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control type="password" value={user.password} 
                              onChange={e => change(e, "password")}  
                              placeholder="Mật khẩu" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control type="password" value={user.confirmPass} 
                              onChange={e => change(e, "confirmPass")}  
                              placeholder="Xác nhận mật khẩu" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control type="file" ref={avatar}  />
            </Form.Group>
            <Form.Group className="mb-3">
                {loading === true?<MySpinner />:<Button type="submit" variant="danger">Đăng ký</Button>}
            </Form.Group>
        </Form>
    </>
}

export default Register;