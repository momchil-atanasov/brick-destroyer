describe("MouseBoundSystem", function() {
  var decimalPoints = 4;
  var manager;
  var system;
  var noBoundEntity;
  var xBoundEntity;
  var yBoundEntity;
  var allBoundEntity;

  beforeEach(function() {
    manager = new ecs.EntityManager();
    system = new game.MouseBoundSystem(manager);
    manager.addSystem(system);

    noBoundEntity = manager.createEntity();
    noBoundEntity.addComponent("location", new game.LocationComponent());

    xBoundEntity = manager.createEntity();
    xBoundEntity.addComponent("location", new game.LocationComponent());
    xBoundEntity.addComponent("mouseBound", new game.MouseBoundComponent({
      axisYBound: false
    }));

    yBoundEntity = manager.createEntity();
    yBoundEntity.addComponent("location", new game.LocationComponent());
    yBoundEntity.addComponent("mouseBound", new game.MouseBoundComponent({
      axisXBound: false
    }));

    allBoundEntity = manager.createEntity();
    allBoundEntity.addComponent("location", new game.LocationComponent());
    allBoundEntity.addComponent("mouseBound", new game.MouseBoundComponent());
  });

  describe("when a mouse-move occurs", function() {
    beforeEach(function() {
      system.onMouseMove(13.5, 16.6);
      manager.update(1.0);
    });

    function assertEntityLocation(entity, expectedX, expectedY) {
      var locationComp = entity.getComponent("location");
      expect(locationComp.location.x).toBeCloseTo(expectedX, decimalPoints);
      expect(locationComp.location.y).toBeCloseTo(expectedY, decimalPoints);
    }

    it("unbound entity is not moved", function() {
      assertEntityLocation(noBoundEntity, 0.0, 0.0);
    });

    it("X-bound entity is moved only horizontally", function() {
      assertEntityLocation(xBoundEntity, 13.5, 0.0);
    });

    it("Y-bound entity is moved only vertically", function() {
      assertEntityLocation(yBoundEntity, 0.0, 16.6);
    });

    it("all-bound entity is moved horizontally and vertically", function() {
      assertEntityLocation(allBoundEntity, 13.5, 16.6);
    });
  });
});
