let id='';
const form = document.getElementById('myForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const selling = document.getElementById('selling').value;
    const product = document.getElementById('product').value;
    const category = document.getElementById('category').value;
    const obj = {
        selling,
        product,
        category
    };
    if (id === '') {
      try {
        await axios.post('http://localhost:3000/user', obj);
        await displayData();
        form.reset();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.put(`http://localhost:3000/user/${id}`, obj);
        await displayData();
        form.reset();
      } catch (error) {
        console.error(error);
      }
      id = '';
    }
  });
  

async function displayData() {
    try {
        const response = await axios.get('http://localhost:3000/user');
        const electronic_ul = document.getElementById('electronic_items');
        const food_ul = document.getElementById('food_items');
        const skincare_ul = document.getElementById('skincare_items');
        electronic_ul.innerHTML = '<h2>Electronic Items</h2>';
        food_ul.innerHTML = '<h2>Food Items</h2>';
        skincare_ul.innerHTML = '<h2>Skincare Items</h2>';
        const data = response.data;

        if (data != null) {
            for (let i = 0; i < data.length; i++) {
                const listItem = document.createElement('li');
                listItem.textContent = `Selling Price: ${data[i].selling}, Product Name: ${data[i].product}, Category: ${data[i].category}`;

                if (data[i].category == "electronic") {
                    electronic_ul.appendChild(listItem);
                } else if (data[i].category == "food") {
                    food_ul.appendChild(listItem);
                } else {
                    skincare_ul.appendChild(listItem);
                }

                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', async function () {
                    await deleteData(data[i].id);
                });

                let editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', function () {
                  editData(data[i].id);
                });
                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteData(id) {
    try {
        await axios.delete(`http://localhost:3000/user/${id}`);
        await displayData();
    } catch (error) {
        console.log(error);
    }
}

async function editData(editId) {
  try {
    const response = await axios.get('http://localhost:3000/user');
    const data = response.data;
    if (data !== null) {
      const user = data.find((item) => item.id === editId);
      if (user) {
        document.getElementById('selling').value=user.selling;
        document.getElementById('product').value=user.product;
        document.getElementById('category').value=user.category;
        id = user.id; 
      }
    }
  } catch (error) {
    console.error(error);
  }
}

displayData();