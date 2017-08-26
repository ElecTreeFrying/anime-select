for (let i = 0; i < this.listDynamic.length; i++) {
  this.listObject.push({
    name: this.listDynamic[i]['attributes'].name,
    image: () => {
      let image = this.listDynamic[i]['attributes'].image.original;
      if (image) return image;
      else return 'no-image';
    },
    description: this.listDynamic[i]['attributes'].description
  }) }
