const Bot=()=>{
  return (<Popover>
    <PopoverTrigger asChild>
      {!location.pathname === "/" && (
        <button className="absolute bottom-14 right-20  bg-white shadow-xl border-[0.5px] border-[#b0b0b0] rounded-full h-16 w-16">
          <img src="/boticon.png" />
        </button>
      )}
    </PopoverTrigger>
    <PopoverContent className="w-80 bg-white border-2 top-0">
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              defaultValue="100%"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxWidth">Max. width</Label>
            <Input
              id="maxWidth"
              defaultValue="300px"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              defaultValue="25px"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxHeight">Max. height</Label>
            <Input
              id="maxHeight"
              defaultValue="none"
              className="col-span-2 h-8"
            />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>);
}

export default Bot;
