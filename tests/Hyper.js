import test from 'tape'
import {Client} from './helpers'


test('containers', function (t) {
    t.plan(2)
    let hyper = Client()

    hyper.createImage({imageName: 'alpine:3.4'}, (err) => {
      t.error(err, 'create image')

      hyper.getContainers((err, containers) => {
        t.error(err, 'get containers')

      })
    })
})


test('images', function (t) {
    t.plan(4)
    let hyper = Client()

    hyper.createImage({imageName: 'alpine:3.4'}, (err) => {
      t.error(err, 'create image')

      hyper.getImages((err, images) => {
        t.error(err, 'get images')

        let image = images.find((i) => i.name == 'alpine' && i.tag == '3.4')
        t.ok(image, 'image exists')

        hyper.deleteImage({imageId: image.id, force: 'yes'}, (err) => {
          t.error(err, 'delete image')
        })
      })
    })
})