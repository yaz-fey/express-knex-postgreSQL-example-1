const router = require('express').Router();

let data = require('../data.js');
const Aktor = require('../data/data-model2');

router.get("/", (req, res,next) => {
  Aktor.findAktor().then(aktorler => {
    res.status(200).json(aktorler);
  }).catch(error => {
    console.log("fey error:" + error);
    next({
      statusCode: 500,
      errorMessage: "Aktorler alinirken hata olustu.",
      error,
    })
  })
});


// let next_id = 4;

// router.post("/", (req, res, next) => {
//     // let yeni_aktor = req.body;

//     // if (!yeni_aktor.isim) {
//     //     next({ statusCode: 400, errorMessage: "Aktor eklemek için isim giriniz" });
//     // } else if(yeni_aktor.isim && !yeni_aktor.filmler){
//     //     next({ statusCode: 400, errorMessage: "Aktor eklemek için filmlerini giriniz" });

//     // } else {
//     //     yeni_aktor.id = next_id;
//     //     next_id++;
//     //     data.push(yeni_aktor);
//     //     res.status(201).json(yeni_aktor);
//     // }
//     const yeni_aktor = req.body;

//     console.log(yeni_aktor.isim + " diğer: " + yeni_aktor.film);
//     // if (!yeni_aktor.isim) {

//     //     next({ statusCode: 400, errorMessage: "Aktor eklemek için isim giriniz" });} else {
//     // // } else if (yeni_aktor.isim && !yeni_aktor.filmler) {

//     // //     next({ statusCode: 400, errorMessage: "Aktor eklemek için filmlerini giriniz" });
//     // // } else {
//     //     Aktor.addAktor(yeni_aktor).then( added => {
//     //         res.status(201).json(added);
//     //     }).catch(error => {
//     //         // isim ve değer aynı ise sadece değer yazılır yanı "error: error"  demek yerine sadece error dediğimiz gibi
//     //         next({ statusCode: 500, errorMessage: "Aktor eklerken bir hata olustu", error });
//     //     })
//     // }





// });


// router.post("/", (req, res, next) => {
//     const yeniAktor2= req.body;

//     console.log("fffffffffffffffffffffffffffffffffffffffffffffffffffffff"+yeniAktor2.isim );
//     if(!yeniAktor2.isim){
//         next({
//             statusCode:400,
//             errorMessage: "Aktor eklemek icin isim giriniz...",
//         });
//     } else {


//         Aktor.addAktor(yeniAktor2).then((added) => {
//             res.status(201).json(added);
//         }).catch(error => {
//             next({
//                 statusCode: 500,
//                 errorMessage: "Aktor eklerken hata olustu...",
//                 error,
//             });
//         });

//     }

// });

router.post("/", (req, res, next) => {
  const yeniAktor = req.body;

  if (!yeniAktor.isim) {
    next({
      statusCode: 400,
      errorMessage: "Aktor eklemek icin isim girmelisiniz.",
    });
  } else {
    Aktor.addAktor(yeniAktor)
      .then((added) => {
        res.status(201).json(added);
      })
      .catch((error) => {
        next({
          statusCode: 500,
          errorMessage: "Aktor eklerken hata olustu.",
          error,
        });
      });
  }
});



// router.delete("/:id", (req, res) => {

//   const delete_id = req.params.id;

//   // server.delete komutu olduğu yerde gelen id değerimiz Numbera çevirilir.
//   const del_aktor = data.find(aktor => aktor.id === Number(delete_id));
//   console.log(del_aktor);

//   if (del_aktor) {

//     data = data.filter((aktor) => aktor.id !== Number(delete_id));
//     res.status(204).end();
//   } else {
//     res
//       .status(404)
//       .json({ errorMessage: "Silmeye calistiginiz aktor sistemde yok." });
//   }

// });


router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  //eğer kullanıcıdan gelen degerkei id veritabanında yoksa burada kontrolü yapılır ve hiç diğer satırlardaki
  //işlemlere devam edilmez


  Aktor.findAktorById(id).then(silinecekAktor => {
    Aktor.deletAktor(id).then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        next({
          statusCode: 400, errorMessage: "Silmeye calistiginiz aktor sistemde mevcut degil"
        });
      }

    })
      .catch(error => {
        next({
          statusCode: 500,
          errorMessage: "Aktor silinirken bir hata olustu...",
          error
        });
      })

  }).catch(error => {
    next({
      statusCode: 500,
      errorMessage: "Aktor bulunurken bir hata olustu...",
      error
    });
  })





});



router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const updateAktor = req.body;

  if (!updateAktor.isim) {
    next({
      statusCode: 400,
      errorMessage: "Aktor ismi bos olamaz."
    })
  } else {
    Aktor.updateAktor(updateAktor, id).then(updated => {
      res.status(200).json(updated);
    }).catch(error => {
      next({
        statusCode: 500,
        errorMessage: "Aktor guncellenemedi",
        error
      })
    })

  }


});

router.put("/:id", (req, res) => {
  const guncellenecek_aktor_id = req.params.id;
  console.log(guncellenecek_aktor_id);
  const guncellenecek_aktor = data.find(aktor => aktor.id === Number(guncellenecek_aktor_id));
  //guncellenecek_aktor = req.body;
  console.log(req.body);


  if (guncellenecek_aktor) {
    data = data.filter(aktor => aktor.id !== Number(guncellenecek_aktor_id));

    let guncellenecek_aktor = req.body;
    guncellenecek_aktor.id = guncellenecek_aktor_id;
    data.push(guncellenecek_aktor);
    res.status(200).json(guncellenecek_aktor);


  } else {
    res.status(404).json({ errorMessage: "Olmayan aktoru guncelleyemezsiniz!!!" });
  }


});



// router.get("/:id", (req, res) => {

//   console.log("req.body", req.body);


//   const { id } = req.params;
//   const aktor = data.find(aktor => aktor.id === parseInt(id));
//   if (aktor) {
//     res.status(200).json(aktor);
//   } else {
//     res.status(404).send("Aradığınız aktör bulunamadı...");
//   }

// });

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Aktor.findAktorById(id).then(aktor => {
    if (aktor) {
      res.status(200).json(aktor);
    } else {
      next({
        statusCode: 400,
        errorMessage: "Aktor bulunamadi",
      })
    }


  }).catch(error => {
    next({
      statusCode: 500,
      errorMessage: "Aktor bulunurken hata olustu",
      error
    })
  })

});





module.exports = router;