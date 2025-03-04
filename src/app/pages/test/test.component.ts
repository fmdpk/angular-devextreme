import { Component, Inject } from '@angular/core';
import { MY_CLASS_TOKEN, MY_TOKEN, MyClass } from '../../app.module';
import { Product, ProductsService } from './product.service';
import { DataSource } from 'devextreme/common/data';
import { DxSortableTypes } from 'devextreme-angular/ui/sortable';
import { Task, TasksTestService } from './tasks-test.service';

type DxoItemDraggingProperties = DxSortableTypes.Properties;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  values: string[] = [];
  instancesTemp: MyClass[] = [];
  products: Product[] = [];
  dataSource: DataSource;
  selectedItem: Product | undefined = undefined;

  constructor(
    productService: ProductsService,
    @Inject(MY_TOKEN) values: string[],
    service: TasksTestService,
    @Inject(MY_CLASS_TOKEN) instances: MyClass[]
  ) {
    this.values = values;
    this.instancesTemp = instances;
    console.log(this.instancesTemp);
    console.log(this.values);
    this.instancesTemp.forEach((item) => {
      item.log();
    });
    this.products = productService.getProducts();
    this.dataSource = new DataSource({
      store: this.products,
      group: 'Category',
    });
    this.doingTasks = service.getDoingTasks();
    this.plannedTasks = service.getPlannedTasks();
  }

  logDetails() {
    this.instancesTemp.forEach((item) => {
      item.log();
    });
  }

  // -----------------------------------------------------------------------------

  doingTasks: Task[];

  plannedTasks: Task[];

  onDragStart: DxoItemDraggingProperties['onDragStart'] = (e) => {
    e.itemData = e.fromData[e.fromIndex];
  };

  onAdd: DxoItemDraggingProperties['onAdd'] = (e) => {
    e.toData.splice(e.toIndex, 0, e.itemData);
  };

  onRemove: DxoItemDraggingProperties['onRemove'] = (e) => {
    e.fromData.splice(e.fromIndex, 1);
  };

  onReorder: DxoItemDraggingProperties['onReorder'] = (e) => {
    this.onRemove!(e as DxSortableTypes.RemoveEvent);
    this.onAdd!(e as DxSortableTypes.AddEvent);
  };
}
