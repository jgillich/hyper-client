import test from 'tape'
import {Client} from './helpers'


test('pods', function (t) {
  t.plan(5)
  let hyper = Client()

  hyper.createImage({imageName: 'hello-world'}, (err) => {
    t.error(err, 'create image')

    let pod = {
      id: 'hello-world-id',
      containers: [
        {
          image: 'hello-world'
        }
      ]
    }

    hyper.createPod(pod, (err, pod) => {
      t.error(err, 'create pod')

      hyper.startPod({podId: pod.ID}, (err, data) => {
        t.error(err, 'start pod')

        hyper.stopPod({podId: pod.ID, stopVM: 'yes'}, (err) => {
          t.error(err, 'stop pod')

          hyper.deletePod({podId: pod.ID}, (err) => {
            t.error(err, 'delete pod')
          })

        })
      })

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