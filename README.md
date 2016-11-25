# hyper-client

Work in progress HyperContainer API client for Node.js.

## Usage

    npm install hyper-client --save

### Example: Creating  and starting a pod

    import Hyper from 'hyper'

    let hyper = new Hyper({
      socketPath: '/var/run/hyper.sock'
    })

    let podfile = {
      id: 'hello-world-id',
      containers: [
        {
          image: 'hello-world'
        }
      ]
    }

    hyper.createPod(podfile, (err, pod) => {
      if(err) throw err;
      console.log(`Created pod with ID ${pod.id}`)

      hyper.startPod({podId: pod.ID}, (err) => {
        if(err) throw err;
        console.log(`Started pod with ID ${pod.id}`)
      })

    })

### Available methods

All methods have the signature `(opts, (err, data))`. For more information on the
available options, refer to the [API documentation](https://docs.hypercontainer.io/reference/api.html).

* createPod
* startPod
* stopPod
* deletePod
* createContainer
* getContainers => array of containers
* getImages => array of images
* createImage
* deleteImage