import { GenericSubpage } from "@/utils/interfaces/GenericSubpage";
import { Header } from './HeaderSubpageComponent'
import { ItemCell } from "./ItemCellSubpageComponent";
import { ActionsSubpageComponent } from "./ActionsSubpageComponent";
import "./index.css";

interface GenericSubpageProps {
  value: string;
  _id?: number | string;
  status?: string | boolean;
  actions?: React.ReactNode;
  genericItem: GenericSubpage[];
}

const GenericSubpageComponent = ({
  value,
  _id,
  status,
  actions,
  genericItem,
}: GenericSubpageProps) => {
  return (
    <div className="p-20">
      <Header 
        value={value}
        _id={_id}
        status={status}   
      />
      <div className="h-full pt-10 px-4">
        <div className="table-container">
          {genericItem.map((item, index) => item.description ? (
            <div key={index}>
              <ItemCell
                title={item.title}
                description={item.description}
                type={item.type}
                link={item.link}
                username={item.username}
              />
            </div>
          ): <div className="hidden" key={index}></div>)}
        </div>
      </div>
      <ActionsSubpageComponent 
        value={actions}
      />
    </div>
  );
};

export default GenericSubpageComponent;
