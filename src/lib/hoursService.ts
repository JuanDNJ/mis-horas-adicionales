import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  writeBatch,
  type DocumentData,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { type HoursData } from "@/components/HoursForm";

export interface HoursRecord extends HoursData {
  id?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const COLLECTION_NAME = "hours_records";

/**
 * Guarda un nuevo registro de horas en Firestore
 */
export const createHoursRecord = async (userId: string, data: HoursData): Promise<HoursRecord> => {
  try {
    const now = new Date();
    const recordData = {
      ...data,
      userId,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    };

    const docRef = await addDoc(collection(firestore, COLLECTION_NAME), recordData);

    return {
      id: docRef.id,
      ...data,
      userId,
      createdAt: now,
      updatedAt: now,
    };
  } catch (error) {
    console.error("Error al crear registro de horas:", error);
    throw new Error("No se pudo guardar el registro de horas");
  }
};

/**
 * Actualiza un registro de horas existente
 */
export const updateHoursRecord = async (
  recordId: string,
  data: Partial<HoursData>
): Promise<void> => {
  try {
    const recordRef = doc(firestore, COLLECTION_NAME, recordId);
    await updateDoc(recordRef, {
      ...data,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error("Error al actualizar registro de horas:", error);
    throw new Error("No se pudo actualizar el registro de horas");
  }
};

/**
 * Elimina un registro de horas
 */
export const deleteHoursRecord = async (recordId: string): Promise<void> => {
  try {
    const recordRef = doc(firestore, COLLECTION_NAME, recordId);
    await deleteDoc(recordRef);
  } catch (error) {
    console.error("Error al eliminar registro de horas:", error);
    throw new Error("No se pudo eliminar el registro de horas");
  }
};

/**
 * Obtiene todos los registros de horas de un usuario
 */
export const getUserHoursRecords = async (userId: string): Promise<HoursRecord[]> => {
  try {
    const q = query(
      collection(firestore, COLLECTION_NAME),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const records: HoursRecord[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      records.push({
        id: doc.id,
        empresa: data.empresa || "",
        numero_empleado: data.numero_empleado || "",
        nombre: data.nombre || "",
        apellido_paterno: data.apellido_paterno || "",
        apellido_materno: data.apellido_materno || "",
        telefono: data.telefono || "",
        dia: data.dia || "",
        mes: data.mes || "",
        anio: data.anio || "",
        hora_entrada: data.hora_entrada || "",
        hora_salida: data.hora_salida || "",
        origen: data.origen || "",
        destino: data.destino || "",
        total_horas: data.total_horas || "",
        userId: data.userId,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      });
    });

    return records;
  } catch (error) {
    console.error("Error al obtener registros de horas:", error);
    throw new Error("No se pudieron cargar los registros de horas");
  }
};

/**
 * Obtiene registros de horas filtrados por rango de fechas
 */
export const getUserHoursRecordsByDateRange = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<HoursRecord[]> => {
  try {
    const q = query(
      collection(firestore, COLLECTION_NAME),
      where("userId", "==", userId),
      where("createdAt", ">=", Timestamp.fromDate(startDate)),
      where("createdAt", "<=", Timestamp.fromDate(endDate)),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const records: HoursRecord[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      records.push({
        id: doc.id,
        empresa: data.empresa || "",
        numero_empleado: data.numero_empleado || "",
        nombre: data.nombre || "",
        apellido_paterno: data.apellido_paterno || "",
        apellido_materno: data.apellido_materno || "",
        telefono: data.telefono || "",
        dia: data.dia || "",
        mes: data.mes || "",
        anio: data.anio || "",
        hora_entrada: data.hora_entrada || "",
        hora_salida: data.hora_salida || "",
        origen: data.origen || "",
        destino: data.destino || "",
        total_horas: data.total_horas || "",
        userId: data.userId,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      });
    });

    return records;
  } catch (error) {
    console.error("Error al obtener registros de horas por rango de fecha:", error);
    throw new Error("No se pudieron cargar los registros de horas");
  }
};

/**
 * Actualiza el nombre de la empresa en todos los registros de horas de un usuario
 * Útil cuando se edita el nombre de un perfil de trabajo y se quiere mantener sincronizado
 */
export const updateCompanyNameInRecords = async (
  userId: string,
  oldCompanyName: string,
  newCompanyName: string
): Promise<void> => {
  try {
    // 1. Buscamos todos los registros que tengan el nombre antiguo
    const q = query(
      collection(firestore, COLLECTION_NAME),
      where("userId", "==", userId),
      where("empresa", "==", oldCompanyName)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return;
    }

    // 2. Usamos Batch para actualizar múltiples documentos atómicamente
    // Nota: Firestore limita los batch a 500 operaciones. Si hay más, habría que dividirlo.
    const batch = writeBatch(firestore);

    querySnapshot.docs.forEach((doc) => {
      batch.update(doc.ref, {
        empresa: newCompanyName,
        updatedAt: Timestamp.fromDate(new Date()),
      });
    });

    await batch.commit();
    console.log(
      `Actualizados ${querySnapshot.size} registros de ${oldCompanyName} a ${newCompanyName}`
    );
  } catch (error) {
    console.error("Error al migrar nombre de empresa en registros:", error);
    // No lanzamos error para no romper el flujo principal si esto falla,
    // pero idealmente deberíamos notificarlo.
  }
};
