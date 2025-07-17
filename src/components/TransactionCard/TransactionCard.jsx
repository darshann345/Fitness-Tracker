import styles from './TransactionCard.module.css'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiPizza, PiGift } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsSuitcase2 } from "react-icons/bs";

export default function TransactionCard({ details, handleDelete, handleEdit }) {

    return (
        <div className={styles.card}>
            <div className={styles.cardInner}>
                
                <div className={styles.cardInfo}>
                    {/* <h5>{details.title}</h5> */}
                    {/* <p>{details.date}</p> */}
                    <p className = {styles.short_description}>{details.short_description}</p>
                    <div className = {styles.daily_calories_data}>
                        <p>Calorie Intake: {details.calorie_intake}</p>
                        <p>Calorie Burned: {details.calorie_burned}</p>
                    </div>
                </div>
            </div>

            <div className={styles.cardInner}>
                <div className={styles.cardButtonWrapper}>
                    <p className = {styles.date}>{details.date}</p>

                    <button className={styles.cardDelete} onClick={handleDelete}>
                        <IoMdCloseCircleOutline />
                    </button>
                    <button className={styles.cardEdit} onClick={handleEdit}>
                        <MdOutlineModeEdit />
                    </button>
                </div>
            </div>

        </div>
    )
}