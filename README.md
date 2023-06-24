# Nasa-Web application Server


## Installation

```bash
npm i
```

## Usage

```python
1. create a .env file in the root directory and add the following as an example:
MONGO_URL='mongodb://localhost:27017/nasa'
PORT=4000
JWT_SECRET=haveFun

2. npm run dev -> to run the server
3. npm run test -> to run tests

```
## How to use

### Register
```python
1. endpoint = http://localhost:4000/register   "Or any port of your choice"
2. Provide the following example json in the body :
{
   "fullName":"Nasa User", "password":"Easy Password",  "email": "nasa@yahoo.com", "userName": "NasaUser", "image": "placeholder link"
}

It will return user token to be used in following requests
```

### Login
```python
1. endpoint = http://localhost:4000/login   "Or any port of your choice"
2. Provide the following example json in the body :
{
   "password":"Easy Password",  "email": "nasa@yahoo.com"
}

```

### Search
```python
1. endpoint = http://localhost:4000/search?q=moon&pageNumber=7&limit=1   "Or any port of your choice"
          Note: pageNumber and limit to control the pagination of the return, these are example values, feel free to change them
    

It will return an array of objects like this:
[
    {
        "href": "https://images-assets.nasa.gov/image/PIA13496/collection.json",
        "data": [
            {
                "center": "JPL",
                "title": "The Moon Largest Impact Basin",
                "nasa_id": "PIA13496",
                "date_created": "2010-07-13T22:24:40Z",
                "keywords": [
                    "Moon",
                    "Lunar Reconnaissance Orbiter LRO"
                ],
                "media_type": "image",
                "description_508": "The Moon Largest Impact Basin",
                "secondary_creator": "NASA/GSFC/Arizona State University",
                "description": "The Moon Largest Impact Basin"
            }
        ],
        "links": [
            {
                "href": "https://images-assets.nasa.gov/image/PIA13496/PIA13496~thumb.jpg",
                "rel": "preview",
                "render": "image"
            }
        ]
    }
]
```
### Add to favorite
```python
1. endpoint = http://localhost:4000/favorite/add?userId=6488cc2ac33994783f765ba9   "Or any port of your choice"
    Note: it takes the logged in userId from client and it will do the magic
2. you Shall provide an Authorization token in the headres 

```

### Remove from favorite
```python
1. endpoint = http://localhost:4000/favorite/remove?userId=648859c255935ea38dc0a9ee&favoriteId=6489f1d1bf7bc4b4ade44677   "Or any port of your choice"
    Note: it  takes two query params:
        a. userId
        b. favoriteId for the specific data to be removed
2. you Shall provide an Authorization token in the headres 
3. Provide the target favorite object from front end to be removed i.e.:
{
  "_id": {
    "$oid": "648859fb55935ea38dc0a9f0"
  },
  "href": "https://images-assets.nasa.gov/image/PIA13496/collection.json",
  "data": [
    {
      "center": "JPL",
      "title": "The Moon Largest Impact Basin",
      "nasa_id": "PIA13496",
      "date_created": {
        "$date": "2010-07-13T22:24:40.000Z"
      },
      "keywords": [
        "Moon",
        "Lunar Reconnaissance Orbiter LRO"
      ],
      "media_type": "image",
      "description_508": "The Moon Largest Impact Basin",
      "secondary_creator": "NASA/GSFC/Arizona State University",
      "description": "The Moon Largest Impact Basin",
      "_id": {
        "$oid": "648859fb55935ea38dc0a9f1"
      }
    }
  ],
  "links": [
    {
      "href": "https://images-assets.nasa.gov/image/PIA13496/PIA13496~thumb.jpg",
      "rel": "preview",
      "render": "image",
      "_id": {
        "$oid": "648859fb55935ea38dc0a9f2"
      }
    }
  ],
  "increment": -2,
  "__v": 0
}

```
