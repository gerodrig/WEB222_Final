/** Add any JavaScript you need to this file. */
window.onload = () => {
  (() => {
    function populateProducts(Id) {
      let products = Products.getId(Id);
      let nodeList = node.createNode('div', 'row');

      products.forEach(product => {
        var prodNode = node.createNode('div', 'col-lg-4 col-md-6 mb-4');
        var productNode = node.createNode('div', 'card h-100', 'product-' + product.id);

        if (product.images.length > 0) {
          var imgProperties = product.images[0];
          imgProperties.height = '200';
          var productImg = node.createImg(imgProperties, 'card-img-top');

          productNode.appendChild(productImg);
        }

        var prodDetails = node.createNode('div', 'card-body');

        var prodTitle = node.createNode('h5', 'card-title');
        prodTitle.appendChild(node.createTextNode(product.name));

        prodDetails.appendChild(prodTitle);

        var productDescNode = node.createNode('div', 'card-text');
        productDescNode.appendChild(node.createTextNode(product.desc));
        prodDetails.appendChild(productDescNode);

        var priceInNode = node.createNode('div', 'card-text');
        var price = node.createNode('span', 'badge badge-warning');
        price.appendChild(node.createTextNode('$' + product.price.toFixed(2)));
        priceInNode.appendChild(price);
        prodDetails.appendChild(priceInNode);

        productNode.appendChild(prodDetails);

        productNode.style.cursor = 'pointer';
        prodNode.appendChild(productNode);
        nodeList.appendChild(prodNode);
      });

      var productsContainer = document.querySelector('#products-container');
      productsContainer.innerHTML = '';
      productsContainer.appendChild(nodeList);
    }

    function fillCats() {
      var navNode = node.createNode('nav', 'category-nav nav flex-column');

      var categories = productCat.findAll();

      categories.forEach(category => {
        var anchor = node.createAnchor('#', category.name, 'nav-link', 'category-' + category.id);
        anchor.onclick = el => {
          el.preventDefault();
          openCategory(category.id);
        };
        navNode.appendChild(anchor);
      });

      var container = document.querySelector('#categories-container');
      container.appendChild(navNode);

      if (categories.length > 0) {
        var activateNode = categories[0].id;
        var categoryId = getUrl.getParam('category_id');

        if (categoryId !== null) {
          var category = productCat.findById(categoryId);

          if (category.id !== -1) {
            activateNode = category.id;
          }
        }

        openCategory(activateNode);
      }
    }

    function openCategory(id) {
      var category = productCat.findById(id);
      if (category) {
        document.querySelector('#selected-cat').innerHTML = category.name;
      }

      stateTrack.setState('activeCategory', id);

      document.querySelectorAll('#categories-container .nav-link').forEach(el => {
        if (!(el.hasAttribute('id') && el.getAttribute('id') === 'category-' + id)) {
          el.classList.remove('active');
        } else {
          if (!el.classList.contains('active')) {
            el.classList.add('active');
          }
        }
      });

      populateProducts(id);
    }
    fillCats();
  })();
};

var getUrl = (function() {
  var query = new URLSearchParams(window.location.search);

  return {
    getParam: function(paramName) {
      return query.has(paramName) ? query.get(paramName) : null;
    }
  };
})();

//FUNCTION that helps create additional nodes to update the content
var node = (() => {
  //return node, text, img and anchor so for node generation
  return {
    createNode: function(type, Class, Id) {
      var node = document.createElement(type);

      if (Class) {
        node.setAttribute('class', Class);
      }
      if (Id) {
        node.setAttribute('id', Id);
      }

      return node;
    },
    createTextNode: function(txt) {
      var node = document.createTextNode(txt);

      return node;
    },
    createImg: function(imgProps, Class, Id) {
      let img = document.createElement('img');

      img.src = imgProps.src;
      img.alt = '';
      img.title = imgProps.title;
      img.width = imgProps.width;
      img.height = imgProps.height;

      if (Class) {
        img.setAttribute('class', Class);
      }

      if (Id) {
        img.setAttribute('id', Id);
      }

      return img;
    },
    createAnchor: function(url, txt, Class, Id) {
      var anchor = document.createElement('a');

      anchor.setAttribute('href', url);

      if (Class) {
        anchor.setAttribute('class', Class);
      }
      if (Id) {
        anchor.setAttribute('id', Id);
      }
      if (txt) {
        anchor.appendChild(document.createTextNode(txt));
      }

      return anchor;
    }
  };
})();

var stateTrack = (() => {
  var currentState = window.localStorage;

  return {
    setState: (el1, val) => {
      currentState.setItem(el1, JSON.stringify(val));
    },
    getState: el1 => {
      return currentState.getItem(el1);
    }
  };
})();

//PRODUCT CATEGOERY DEFINITION
var productCat = (() => {
  var merchandise = [
    {
      id: 1,
      name: 'Monitors',
      desc: 'Best monitors in the market for specially desgined for gamers'
    },
    {
      id: 2,
      name: 'Keyboards',
      desc: 'Best keyboards in the market for specially desgined for gamers'
    },
    {
      id: 3,
      name: 'Mice',
      desc: 'Best mice in the market for specially desgined for gamers'
    },
    {
      id: 4,
      name: 'Headsets',
      desc: 'Best headsets in the market for specially desgined for gamers'
    },
    {
      id: 5,
      name: 'Printers',
      desc: 'We have the latest printers and models at cheap prices'
    }
  ];

  return {
    // return the object merchandise with all the webpage content
    findAll: () => {
      return merchandise;
    },
    //return al the product information including the id that helps kkep track of the products
    findById: id => {
      var productData = {};

      var found = merchandise.filter(category => {
        return category.id === id;
      });

      if (found.length > 0) {
        productData = found[0];
      } else {
        productData.id = -1;
      }

      return productData;
    }
  };
})();

//function where an array with all the product information is defined
var Products = (() => {
  let products = [
    {
      id: 1,
      category_id: 1,
      name: 'LCD HD monitor',
      desc: 'Best monitor in market for your gaming needs',
      price: 199.98,
      images: [
        {
          src: 'images/monitor_1.jpg'
        }
      ]
    },
    {
      id: 2,
      category_id: 1,
      name: 'Designer monitor',
      desc: 'Best monitor in market for your designer needs',
      price: 298.99,
      images: [
        {
          src: 'images/monitor_2.jpg'
        }
      ]
    },
    {
      id: 3,
      category_id: 1,
      name: 'DJ monitor',
      desc: 'Best monitor in market for your audio production needs',
      price: 329,
      images: [
        {
          src: 'images/monitor_3.jpg'
        }
      ]
    },
    {
      id: 4,
      category_id: 1,
      name: 'VIVID LCD monitor',
      desc: 'Low price monitor for your student needs',
      price: 89.99,
      images: [
        {
          src: 'images/monitor_4.jpg'
        }
      ]
    },
    {
      id: 5,
      category_id: 2,
      name: 'Keyboard Master',
      desc: 'Best Gamer keyboard for FPS games',
      price: 98.99,
      images: [
        {
          src: 'images/keyboard_1.jpg'
        }
      ]
    },
    {
      id: 6,
      category_id: 2,
      name: 'Keyboard PRO',
      desc: 'Best Gamer keyboard for Action games',
      price: 99.99,
      images: [
        {
          src: 'images/keyboard_2.jpg'
        }
      ]
    },
    {
      id: 7,
      category_id: 2,
      name: 'Keyboard ULTRA',
      desc: 'Best Gamer keyboard for MMORPG games',
      price: 129.29,
      images: [
        {
          src: 'images/keyboard_3.jpg'
        }
      ]
    },
    {
      id: 8,
      category_id: 2,
      name: 'Keyboard NOOB',
      desc: 'Best Keyboard to start in gaming',
      price: 39.99,
      images: [
        {
          src: 'images/keyboard_4.jpg'
        }
      ]
    },
    {
      id: 9,
      category_id: 3,
      name: 'Mouse MASTER',
      desc: 'Best Gamer mouse for FPS games',
      price: 61.99,
      images: [
        {
          src: 'images/mouse_1.jpg'
        }
      ]
    },
    {
      id: 10,
      category_id: 3,
      name: 'Mouse PRO',
      desc: 'Best Gamer mouse for Action games',
      price: 58.89,
      images: [
        {
          src: 'images/mouse_2.jpg'
        }
      ]
    },
    {
      id: 11,
      category_id: 3,
      name: 'Mouse UTLRA',
      desc: 'Best Gamer mouse for MMORPG games',
      price: 69.99,
      images: [
        {
          src: 'images/mouse_3.jpg'
        }
      ]
    },
    {
      id: 12,
      category_id: 3,
      name: 'Mouse NOOB',
      desc: 'Best mouse to start in gaming',
      price: 15.98,
      images: [
        {
          src: 'images/mouse_4.jpg'
        }
      ]
    },
    {
      id: 13,
      category_id: 4,
      name: 'Headset MASTER',
      desc: 'Best Gamer headset for seasoned players',
      price: 119.99,
      images: [
        {
          src: 'images/headset_1.jpg'
        }
      ]
    },
    {
      id: 14,
      category_id: 4,
      name: 'Headset PRO',
      desc: 'Best Gamer headset for online players',
      price: 95.99,
      images: [
        {
          src: 'images/headset_2.jpg'
        }
      ]
    },
    {
      id: 15,
      category_id: 4,
      name: 'Headset ULTRA',
      desc: 'Best Gamer headset for professional players',
      price: 129.99,
      images: [
        {
          src: 'images/headset_3.jpg'
        }
      ]
    },
    {
      id: 16,
      category_id: 4,
      name: 'Headset NOOB',
      desc: 'Best Gamer headset for new players',
      price: 49.99,
      images: [
        {
          src: 'images/headset_4.jpg'
        }
      ]
    },
    {
      id: 17,
      category_id: 5,
      name: 'Printer office',
      desc: 'Long term printer for office environment',
      price: 199.98,
      images: [
        {
          src: 'images/printer_1.jpg'
        }
      ]
    },
    {
      id: 18,
      category_id: 5,
      name: 'Printer Student',
      desc: 'Medium term printer for student assignments',
      price: 223.98,
      images: [
        {
          src: 'images/printer_2.jpg'
        }
      ]
    },
    {
      id: 19,
      category_id: 5,
      name: 'Printer school',
      desc: 'Very long term printer for high volume',
      price: 399.99,
      images: [
        {
          src: 'images/printer_3.jpg'
        }
      ]
    },
    {
      id: 20,
      category_id: 5,
      name: 'Portable printer',
      desc: 'Printer designed for emergencies',
      price: 998.99,
      images: [
        {
          src: 'images/printer_4.jpg'
        }
      ]
    }
  ];

  return {
    find: finder => {
      if (typeof finder !== 'function') {
        return products;
      }

      return products.filter(finder);
    },
    findAll: () => {
      return products;
    },
    findById: Id => {
      var productData = {};

      var product = products.filter(product => {
        return (product.id = Id);
      });

      if (product.length > 0) {
        productData = product[0];
      } else {
        productData.id = -1;
      }

      return productData;
    },
    getId: Id => {
      return products.filter(product => {
        return product.category_id === Id;
      });
    }
  };
})();
