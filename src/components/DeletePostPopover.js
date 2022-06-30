import React, { useState, useEffect, useContext, useRef } from "react";
import { Alert, Button, Form, Popover } from "react-bootstrap";
import { useHistory } from "react-router";
import { deleteDevice } from "../http/deviceAPI";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { fetchSearchDevices, fetchDevices } from "../http/deviceAPI";
import "./DeviceList.css";
const DeletePostPopover = () => {
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);

  const history = useHistory();
  const { device } = useContext(Context);

  const deleteOneDevice = () => {
    deleteDevice(id).then((data) => {
      setId("");
      pushShop();
      setShow(true);
    });
  };
  const pushShop = () => {
    history.push(SHOP_ROUTE);
  };

  function byField(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  // фильтрация
  const formEl = useRef();

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (formEl && formEl.current) {
      formEl.current.addEventListener("keydown", clearClickEnter);
    }
    fetchDevices(null, null, 1, 90).then((data) => {
      device.setLists(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  const clearClickEnter = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };

  //    Сортировка

  var sort_by = function (field, reverse, primer) {
    var key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };

  const itemClickHandler = (e) => {
    setIsOpen(!isOpen);
  };

  const inputClickHandler = () => [setIsOpen(true)];

  // let sArr = Arr.sh.sort(byField("id"));

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
              onChange={(e) => setId(e.target.value)}
              placeholder={"ID статьи"}
              className="search_input"
              style={{ width: 255 }}
              onClick={inputClickHandler}
              // onSubmit={() => false}
              ref={formEl}
            />
            <ul
              className="autocomplete"
              style={{ marginTop: 25 }}
              onMouseLeave={itemClickHandler}
            >
              {isOpen &&
                device.lists
                  .map((device) => {
                    return (
                      <li
                        className="autocomplete_item"
                        onClick={itemClickHandler}
                        key={device.id}
                      >
                        id: {device.id}: {device.name.replace(/\[.+\]/, "")}
                      </li>
                    );
                  })
                  .sort((a, b) => Number(b.id) - Number(a.id))}
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
            {show && (
              <div>
                <Alert
                  variant="success"
                  onMouseLeave={() => setShow(false)}
                  onClose={() => setShow(false)}
                  dismissible
                >
                  <Alert.Heading>Пост успешно удален</Alert.Heading>
                  <p style={{ fontSize: "16px" }}>
                    Пожалуйста, обновите страницу, чтобы увидеть изменения
                  </p>
                </Alert>
                {/* <Button onClick={() => setShow(true)}>Show Alert</Button> */}
              </div>
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default DeletePostPopover;
