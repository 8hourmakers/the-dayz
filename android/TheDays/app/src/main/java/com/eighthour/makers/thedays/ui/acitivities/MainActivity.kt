package com.eighthour.makers.thedays.ui.acitivities

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.eighthour.makers.thedays.R
import com.eighthour.makers.thedays.libs.BaseActvity

class MainActivity : BaseActvity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        component.inject(this)
    }


}