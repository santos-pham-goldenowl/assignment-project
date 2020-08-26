const initialState = [
  {
    id: 1,
    name: "Asus laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/24/637233230044441609_dell-inspiron-n3593c-den-dd.png",
    price: "18.000.0000",
  },
  {
    id: 2,
    name: "Dell laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/14/637224559757700958_asus-vivobook-x509-bac-dd.png",
    price: "24.000.0000",
  },
  {
    id: 3,
    name: "Hp laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/6/2/637266923419786995_hp-15s-fq-bac-dd.png",
    price: "15.000.0000",
  },
  {
    id: 4,
    name: "Thinkpad laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/2/27/637183901495990470_hp-348-g7-bac-dd.png",
    price: "22.000.0000",
  },
  {
    id: 5,
    name: "Asus laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/24/637233230044441609_dell-inspiron-n3593c-den-dd.png",
    price: "18.000.0000",
  },
  {
    id: 6,
    name: "Dell laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/14/637224559757700958_asus-vivobook-x509-bac-dd.png",
    price: "24.000.0000",
  },
  {
    id: 7,
    name: "Hp laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/6/2/637266923419786995_hp-15s-fq-bac-dd.png",
    price: "15.000.0000",
  },
  {
    id: 8,
    name: "Thinkpad laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/2/27/637183901495990470_hp-348-g7-bac-dd.png",
    price: "22.000.0000",
  },
  {
    id: 9,
    name: "Asus laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/24/637233230044441609_dell-inspiron-n3593c-den-dd.png",
    price: "18.000.0000",
  },
  {
    id: 10,
    name: "Dell laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/14/637224559757700958_asus-vivobook-x509-bac-dd.png",
    price: "24.000.0000",
  },
  {
    id: 11,
    name: "Hp laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/6/2/637266923419786995_hp-15s-fq-bac-dd.png",
    price: "15.000.0000",
  },
  {
    id: 12,
    name: "Thinkpad laptop",
    src:
      "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/2/27/637183901495990470_hp-348-g7-bac-dd.png",
    price: "22.000.0000",
  },
];

function ItemListReducer(state = initialState, action) {
  switch (action.type) {
    case "Add":
      return null;
    default:
      return state;
  }
}

export default ItemListReducer;
