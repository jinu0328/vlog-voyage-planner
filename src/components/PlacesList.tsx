
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Place } from '@/types';
import { MapPin, Trash2, Plus, GripVertical } from 'lucide-react';
import AddPlaceDialog from './AddPlaceDialog';

interface PlacesListProps {
  places: Place[];
  onPlaceEdit: (places: Place[]) => void;
  onAddPlace: () => void;
  onDeletePlace: (placeId: string) => void;
}

const PlacesList: React.FC<PlacesListProps> = ({ 
  places, 
  onPlaceEdit, 
  onAddPlace, 
  onDeletePlace 
}) => {
  const [showAddPlace, setShowAddPlace] = useState(false);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex === dropIndex) return;

    const newPlaces = [...places];
    const draggedPlace = newPlaces[dragIndex];
    newPlaces.splice(dragIndex, 1);
    newPlaces.splice(dropIndex, 0, draggedPlace);
    
    onPlaceEdit(newPlaces);
  };

  const handleAddNewPlace = (place: Place) => {
    onPlaceEdit([...places, place]);
  };

  return (
    <>
      <Card className="toss-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-toss-navy">추출된 장소</h3>
          <Button
            onClick={() => setShowAddPlace(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            장소 추가
          </Button>
        </div>

        <div className="space-y-3">
          {places.map((place, index) => (
            <div
              key={place.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="group flex items-center gap-4 p-4 bg-toss-gray-50 rounded-lg border border-toss-gray-200 hover:border-toss-blue/50 transition-colors cursor-move"
            >
              <GripVertical className="w-4 h-4 text-toss-gray-400 group-hover:text-toss-gray-600" />
              
              <div className="flex-shrink-0 w-8 h-8 bg-toss-blue text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-toss-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-toss-gray-900">{place.name}</h4>
                    <p className="text-sm text-toss-gray-600">{place.address}</p>
                    {place.category && (
                      <span className="inline-block px-2 py-1 text-xs bg-toss-blue/10 text-toss-blue rounded-md mt-1">
                        {place.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={() => onDeletePlace(place.id)}
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {places.length === 0 && (
          <div className="text-center py-12 text-toss-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>추출된 장소가 없습니다.</p>
            <p className="text-sm">유튜브 URL을 입력해주세요.</p>
          </div>
        )}
      </Card>

      <AddPlaceDialog
        open={showAddPlace}
        onOpenChange={setShowAddPlace}
        onAddPlace={handleAddNewPlace}
      />
    </>
  );
};

export default PlacesList;
