import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Form, Popover } from "react-bootstrap";
import { useHistory } from "react-router";
import { deleteDevice } from "../http/deviceAPI";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { fetchSearchDevices } from "../http/deviceAPI";
import "./DeviceList.css";
const DeletePostPopover = () => {
  const [id, setId] = useState("");
  const history = useHistory();
  const { device } = useContext(Context);
  const deleteOneDevice = () => {
    deleteDevice(id).then((data) => {
      setId("");
      pushShop();
    });
  };
  const pushShop = () => {
    history.push(SHOP_ROUTE);
  };

  // фильтрация
  const formEl = useRef();

  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (formEl && formEl.current) {
      formEl.current.addEventListener("keydown", clearClickEnter);
    }
  }, []);

  const clearClickEnter = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };
  let sDevices = fetchSearchDevices();
  console.log(sDevices);
  //    Сортировка
  const filteredItems = device.devices.filter((device) => {
    return device.name.toLowerCase().includes(value.toLowerCase());
    // return device.findIndex(() => 'thick scales');
  });

  const itemClickHandler = (e) => {
    setValue(e.target.textContent);
    setIsOpen(!isOpen);
  };

  const inputClickHandler = () => [setIsOpen(true)];

  return (
    <div>
      <Popover className="type-popover delete-popover">
        <div className="popover-body">
          <h5 class="mx-auto mb-2 auth__title auth__title--fiol text-center">
            Удалить статью по ID
          </h5>
          <Form>
            <Form.Control
              value={id}
              onChange={
                ((e) => setId(e.target.value),
                (event) => setValue(event.target.value))
              }
              placeholder={"ID статьи"}
              className="search_input"
              style={{ width: 255 }}
              onClick={inputClickHandler}
              // onSubmit={() => false}
              ref={formEl}
            />
            <ul className="autocomplete" style={{ marginTop: 25 }}>
              {isOpen &&
                filteredItems.map((device) => {
                  return (
                    <li
                      className="autocomplete_item"
                      onClick={itemClickHandler}
                      key={device.id}
                    >
                      id: {device.id}: {device.name}
                    </li>
                  );
                })}
            </ul>
          </Form>
          <div className="mt-3">
            {/* <Button variant="outline-danger" onClick={onHide}>Закрыть</Button> */}
            <Button
              className="auth-log__btn auth__title"
              variant="outline-success"
              onClick={deleteOneDevice}
            >
              Удалить
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default DeletePostPopover;
